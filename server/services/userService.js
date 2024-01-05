import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/User.js';
import { addTokenToBlackList } from './tokenBlackListService.js';

const jwtSecret = process.env.JWT_SECRET;
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
    const userToken = await generateToken(user);

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
        // Check if extension name is exist in DB
        if (user.extensionsName.includes(userData.extensionName) === false) {
            throw new Error('The extension does not exist!')
        }

        // Check if extension is already in use
        // TODO: Made this with mongo model 
        // if (checkWorkingExtension.has(userData.extensionName)) {
        //     throw new Error('Extension is already in use!');
        // }

        // // Add the current extension that is being used
        // checkWorkingExtension.add(userData.extensionName);

        // Create token for extension
        user.extensionsName = userData.extensionName;
        userToken = await generateToken(user);

    } else {
        // Create token for front-end
        userToken = await generateToken(user);
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
async function userLogout({ _id, accessToken, isExtension, extensionName, email }) {
    const userLogoutData = {
        email,
        accessToken,
        userId: _id
    };

    if (isExtension) {
        // TODO: Made this with mongo model 
        // checkWorkingExtension.delete(extensionName);

        userLogoutData.extensionName = extensionName[0];
    }

    const blackListToken = await addTokenToBlackList(userLogoutData);

    return blackListToken;
}

//  Get user 
const getUserById = (userId) => User.findById(userId).select('-password'); // Select all without password (-password)

//  Asynchronously generating token
async function generateToken(user) {

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

    try {
        const token = await new Promise((resolve, reject) => {
            jwt.sign(
                payload,
                jwtSecret,
                options,
                (err, signedToken) => {
                    if (err) {
                        reject(new Error('The token could not be signed!'));
                    } else {
                        resolve(signedToken);
                    }
                });
        });

        return token;

    } catch (err) {
        throw new Error('An error occurred while generating the token!');
    }
}

export {
    userRegister,
    userLogin,
    userLogout,
    getUserById,
};