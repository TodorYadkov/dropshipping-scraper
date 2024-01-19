import path from 'path';
import { promises as fsPromises } from 'fs';

import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';


import { addTokenToBlackList } from './tokenBlackListService.js';
import { User } from '../models/User.js';
import { ExtensionStatus } from '../models/ExtensionStatus.js';
import { signJwtToken } from '../util/signJwtToken.js';
import { verifyJwtToken } from '../util/verifyJwtToken.js';

const roundsBcrypt = 10;

// Register
async function userRegister({ name, email, password, role, extensionName }) {

    // Check if the email is already taken
    const isEmailExisting = await User.findOne({ email });
    if (isEmailExisting) {
        throw new Error('Email is already taken!');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, roundsBcrypt);

    // Create and save new user
    const user = await User.create({
        name,
        email,
        role,
        extensionsName: extensionName,
        password: hashedPassword
    });

    // Create token
    const userToken = await generateUserToken(user);

    // Return user info
    return {
        accessToken: userToken,
        userDetails: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            extensionName: user.extensionsName,
        }
    };
}

//  Login
async function userLogin(userData) {
    // Check if the user with this email exists
    const user = await User.findOne({ email: userData.email });
    if (!user) {
        throw new Error('Invalid email or password!');
    }

    // Validate password
    const matchPassword = await bcrypt.compare(userData.password, user.password);
    if (!matchPassword) {
        throw new Error('Invalid email or password!');
    }

    // Add is extension in accessToken
    user.isExtension = userData.isExtension;

    let userToken;
    if (userData.isExtension) {
        // Check if extension name is exist in user list
        if (user.extensionsName.includes(userData.extensionName) === false) {
            throw new Error('The extension does not exist!');
        }

        // Check if extension is already in use
        const extensionStatus = await ExtensionStatus.findOne({ userId: user._id, extensionName: userData.extensionName });
        if (extensionStatus) {
            if (extensionStatus.isLogin) {
                throw new Error('Extension is already in use!');
            }

            extensionStatus.isLogin = true;
            await extensionStatus.save({ timestamps: false });

        } else {
            await ExtensionStatus.create({
                userId: user._id,
                isLogin: true,
                extensionName: userData.extensionName,
            })
        }

        // Create token for extension
        user.extensionsName = userData.extensionName;
        userToken = await generateUserToken(user);

    } else {
        // Create token for front-end
        userToken = await generateUserToken(user);
    }

    // Return user info
    return {
        accessToken: userToken,
        userDetails: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            extensionName: userData.isExtension ? userData.extensionName : user.extensionsName,
        }
    };
}

//  Logout
async function userLogout({ _id, accessToken, isExtension, extensionName }) {
    const userLogoutData = {
        accessToken,
        userId: _id
    };

    if (isExtension) {
        const extensionStatus = await ExtensionStatus.findOne({ userId: _id, extensionName: extensionName[0] });
        if (extensionStatus) {
            extensionStatus.isWork = false;
            extensionStatus.isLogin = false;

            await extensionStatus.save();
        }

        userLogoutData.extensionName = extensionName[0];
    }

    const blackListToken = await addTokenToBlackList(userLogoutData);

    return { message: 'Logout successful!' };
}

// Create reset link
async function createResetLink({ email, origin }) {
    // Check if the user with this email exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email!');
    }

    const temporaryToken = await signJwtToken({ _id: user._id }, { expiresIn: '1h' });

    const encodedToken = encodeURIComponent(temporaryToken);

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

    // Construct the file path
    const templatePath = path.join('html_templates', 'passwordResetTemplate.html');
    const htmlTemplate = await fsPromises.readFile(templatePath, 'utf8');

    const formattedHtml = htmlTemplate.replace('{{resetLink}}', resetLink);

    transporter.sendMail({
        from: `"Dropshipping Scraper" ${process.env.GMAIL_USER}`,
        to: user.email,
        subject: 'DO NOT REPLY: Dropshipping Scraper - Password Reset',
        text: 'To reset your password, please follow the link. The link is active for 1 hour.',
        html: formattedHtml
    });

    return { resetLink };
}

// Reset password
async function resetUserPassword({ password, resetToken }) {
    const decodedToken = decodeURIComponent(resetToken);
    const verifiedToken= verifyJwtToken(decodedToken);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, roundsBcrypt);

    const userWithNewPassword = await User.findByIdAndUpdate(verifiedToken._id, { password: hashedPassword }, { runValidators: true, new: true });

    // Create token
    const userToken = await generateUserToken(userWithNewPassword);

    // Return user info
    return {
        accessToken: userToken,
        userDetails: {
            _id: userWithNewPassword._id,
            name: userWithNewPassword.name,
            email: userWithNewPassword.email,
            role: userWithNewPassword.role,
            extensionName: userWithNewPassword.extensionsName,
        }
    };
}

//  Get user 
const getUserById = (userId) => User.findById(userId).select('-password'); // Select all without password (-password)

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
        extensionName: user.extensionsName,
    }

    const signedToken = await signJwtToken(payload, options);
    return signedToken;
}

export {
    userRegister,
    userLogin,
    userLogout,
    getUserById,
    createResetLink,
    resetUserPassword,
};






        //     html: `
        //     <div>
        //       <h2 style="color:red">Password Reset</h2>
        //       <p>
        //         Hello,<br> 
        //         To securely reset your password, please open this link within the next hour.
        //       </p>
        //       <a href="${resetLink}">Reset Your Password</a>
        //       <p>
        //         If you did not request this password reset, you can safely ignore this message.
        //       </p>
        //     </div>
        //   `,