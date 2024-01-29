import jwt from 'jsonwebtoken';

export async function signJwtToken(payload, options) {
    const jwtSecret = process.env.JWT_SECRET;

    try {
        const token = await new Promise((resolve, reject) => {
            jwt.sign(
                payload,
                jwtSecret,
                options,
                (err, signedToken) => {
                    if (err) {
                        reject(new Error('The token could not be signed'));
                    } else {
                        resolve(signedToken);
                    }
                });
        });

        return token;

    } catch (err) {
        throw new Error('An error occurred while generating the token');
    }
}