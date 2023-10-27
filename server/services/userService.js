import { bcrypt } from 'bcrypt';
import { jwt } from 'jsonwebtoken';

import { User } from '../models/User';
import { tokenBlackList } from '../util/tokenBlackList.js';

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
async function userLogin({ email, password }) {

    // Check if the user exist
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid username or password!');
    }

    // Validate password
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        throw new Error('Invalid username or password!');
    }

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

//  Logout
async function userLogout(userToken) {
    tokenBlackList.add(userToken);
}

//  Get user 
const getUserById = (userId) => User.findById(userId).select('-password'); // Select all without password (-password)

//  Asynchronously generating token
async function generateToken(user) {

    //  JWT sign options
    const options = { expiresIn: '7d' }

    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
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