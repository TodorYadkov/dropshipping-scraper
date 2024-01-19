import jwt from 'jsonwebtoken';

export function verifyJwtToken(token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            throw new Error('The token is invalid. Please start the process from beginning.');
        }

        return decodedToken;
    });
}