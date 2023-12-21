import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/User.js';
import { addTokenToBlackList } from './tokenBlackListService.js';

const jwtSecret = process.env.JWT_SECRET;
const roundsBcrypt = 10;

// Register
async function userRegister({ name, email, password, role }) {  

    // Check if the username or email is already taken
    const isExisting = await User.findOne({ email });
    if (isExisting) {
        throw new Error('Email is already used!');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, roundsBcrypt);

    // Create and save new user
    const user = await User.create({
        name,
        email,
        role,
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
        }
    };
}

//  Login
async function userLogin(userData) {
    // Check if the user exist
    const user = await User.findOne({ email: userData.email });
    if (!user) {
        throw new Error('Invalid username or password!');
    }

    // Validate password
    const matchPassword = await bcrypt.compare(userData.password, user.password);
    if (!matchPassword) {
        throw new Error('Invalid username or password!');
    }

    // Add is extension in accessToken
    user.isExtension = userData.isExtension;

    let userToken;
    if (userData.isExtension) {
        // Create token for extension
        userToken = await generateToken(user);

    } else {
        // Create token for frontend
        userToken = await generateToken(user);
    }

    // TODO: How to handle extensionName
    // {
    //     email: 'pesho@abv.bg',
    //     password: '123456',
    //     extensionName: 'browser 1',
    //     isExtension: true
    // }

    // Return user info
    return {
        accessToken: userToken,
        userDetails: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            extensionName: 'MOCK_DATA_FROM_LOGIN_USER_SERVICE_88',
        }
    };
}

//  Logout
async function userLogout({ _id, accessToken, extensionName, email }) {
    const userLogoutData = {
        email,
        accessToken,
        userId: _id
    };

    if (extensionName) {
        userLogoutData.extensionName = extensionName;
    }

    return addTokenToBlackList(userLogoutData);
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
        extensionName: 'MOCK_DATA_FROM_GENERATE_TOKEN_116',
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