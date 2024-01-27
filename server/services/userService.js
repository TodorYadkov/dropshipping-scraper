import base64url from 'base64url';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

import { User } from '../models/User.js';
import { Extension } from '../models/Extension.js';
import { TokenBlackList } from '../models/TokenBlacklist.js';

import { signJwtToken } from '../util/signJwtToken.js';
import { verifyJwtToken } from '../util/verifyJwtToken.js';
import { passwordResetTemplate } from '../util/passwordResetTemplate.js';

import { addTokenToBlackList } from './tokenBlackListService.js';

// Register
async function userRegister({ name, email, password, role, extensionName }) {

    // Check if the email is already taken
    const isEmailExisting = await User.findOne({ email });
    if (isEmailExisting) {
        throw new Error('Email is already taken!');
    }

    // Hash password
    const roundsBcrypt = Number(process.env.ROUNDS_BCRYPT);
    const hashedPassword = await bcrypt.hash(password, roundsBcrypt);

    // Create and save new user
    const user = await User.create({
        name,
        email,
        role,
        password: hashedPassword
    });

    // Create extension
    const extension = await Extension.create({
        extensionName,
        default: true,
        owner: user._id,
    });

    // Create token
    const userToken = await generateUserToken(user);

    // Return user info
    const responseObject = createResponseObject(userToken, user);

    return responseObject;
}

//  Login
async function userLogin({ email, password, isExtension, extensionName }) {

    // Check if the user with this email exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password!');
    }

    if (user.disable) {
        throw new Error('Your account has been disabled from admin');
    }

    // Validate password
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        throw new Error('Invalid email or password!');
    }

    let userToken;
    if (isExtension) {
        // Check if extension is already in use
        const extension = await Extension.findOne({ extensionName, owner: user._id });
        if (!extension) {
            throw new Error('The extension does not exist!');
        }

        if (extension.isLogin) {
            throw new Error('Extension is already in use!');
        }

        // Create token to be used on extension
        user.isExtension = isExtension;
        user.extensionName = extensionName;
        user.extensionId = extension._id;
        userToken = await generateUserToken(user);

        // Save extension details
        extension.isLogin = true;
        extension.isWorkBrowser = true;
        extension.accessToken = userToken;
        await extension.save();
    } else {
        // Set isLogin to true
        user.isLogin = true;
        await user.save();

        // Create token to be used with React
        userToken = await generateUserToken(user);
    }

    // Return user info
    const responseObject = createResponseObject(userToken, user);

    return responseObject;
}

//  Logout
async function userLogout({ _id, accessToken, isExtension, extensionName, extensionId }) {
    const userBlacklistData = {
        accessToken,
        userId: _id
    };
 
    if (isExtension) {
        await Extension.findByIdAndUpdate(extensionId, { isWork: false, isLogin: false, isWorkBrowser: false, accessToken: null });

        const isExistAccessToken = await TokenBlackList.findOne({ accessToken });
        if (!isExistAccessToken) {
            userBlacklistData.extensionName = extensionName;
            await addTokenToBlackList(userBlacklistData);
        }

        return { message: 'Logout successful from Extension!' };
    }

    await User.findByIdAndUpdate(_id, { isLogin: false }, { runValidators: true, new: true });
    await addTokenToBlackList(userBlacklistData);

    return { message: 'Logout successful!' };
}

// Create reset link
async function createResetLink({ email, origin }) {
    // Check if the user with this email exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email!');
    }

    if (user.disable) {
        throw new Error('Your account has been disabled from admin');
    }

    const temporaryToken = await signJwtToken({ _id: user._id }, { expiresIn: '10m' });

    const encodedToken = base64url(temporaryToken);

    const resetLink = `${origin}/reset-password/${encodedToken}`;

    // Send an email with the reset link
    const transporter = nodemailer.createTransport({
        // Configure email provider
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASS,
        },
    });

    const htmlTemplate = passwordResetTemplate(resetLink);

    await transporter.sendMail({
        from: `"Dropshipping Scraper" ${process.env.GMAIL_USER}`,
        to: user.email,
        subject: 'DO NOT REPLY: Dropshipping Scraper - Password Reset',
        text: 'To reset your password, please follow the link. The link is active for 10 minutes.',
        html: htmlTemplate
    });

    return { resetLink };
}

// Reset password
async function resetUserPassword({ password, resetToken }) {
    const decodedToken = base64url.decode(resetToken);
    const userDetails = verifyJwtToken(decodedToken);

    // Check if the current token is already used
    const isTokenUsed = await TokenBlackList.findOne({ accessToken: decodedToken, userId: userDetails._id });
    if (isTokenUsed) {
        throw new Error('Reset link is already used');
    }

    await addTokenToBlackList({ accessToken: decodedToken, userId: userDetails._id });

    const user = await User.findOne({ _id: userDetails._id });
    if (!user) {
        throw new Error('User does not exist');
    }
    
    // Check if the current user is disabled
    if (user.disable) {
        throw new Error('Your account has been disabled from admin');
    }

    // Hash password
    const roundsBcrypt = Number(process.env.ROUNDS_BCRYPT);
    const hashedPassword = await bcrypt.hash(password, roundsBcrypt);

    user.password = hashedPassword;
    await user.save();

    // Create token
    const userToken = await generateUserToken(user);

    // Return user info
    const responseObject = createResponseObject(userToken, user);

    return responseObject;
}

//  Get user 
const getUserById = async (userId) => User.findById(userId).select('-password'); // Select all without password (-password)

// Find and Update 
const updateUser = async (userId, userData) => {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { runValidators: true, new: true });
    const userToken = await generateUserToken(updatedUser);

    const responseObject = createResponseObject(userToken, updatedUser);

    return responseObject;
};

// Generating user token
async function generateUserToken(user) {

    //  JWT sign options
    const options = { expiresIn: user.isExtension ? '365d' : '31d' };

    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isExtension: user.isExtension,
        extensionName: user?.extensionName ? user.extensionName : 'React Client',
        ...(user.extensionId && { extensionId: user.extensionId }), // Optional property
    }

    const signedToken = await signJwtToken(payload, options);
    return signedToken;
}

// Data to return to front-end
function createResponseObject(userToken, user) {
    return {
        accessToken: userToken,
        userDetails: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            disable: user.disable,
            avatarURL: user.avatarURL,
            extensionName: user?.extensionName ? user.extensionName : 'React Client',
        }
    };
}

export {
    userRegister,
    userLogin,
    userLogout,
    getUserById,
    createResetLink,
    resetUserPassword,
    updateUser,
};