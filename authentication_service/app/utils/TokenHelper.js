import jwt from "jsonwebtoken";
import token from "../config/token.js";
import prisma from "../database/prisma.js";

export default class TokenHelper {
    static create(userId) {
        return jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (token.tokenExpiration * 60 * 60),
            data: userId
        }, token.tokenSecret);
    }

    static decode(token) {
        try {
            return jwt.decode(token, token.tokenSecret);
        } catch (err) {
            console.log('Error verifing token: ' + err)
            return false
        }
    }

    static verify(providedToken) {
        return new Promise((resolve, reject) => {
            try {
                var decodedProvided = jwt.verify(providedToken, token.tokenSecret);
            } catch (err) {
                console.log('Error verifing token: ' + err)
                resolve(false)
            }

            console.log(decodedProvided.data)

            try {
                var user = prisma.user.findUnique({
                    where: {
                        id: decodedProvided.data,
                    },
                });
            } catch (error) {
                console.error('Error querring user:', error);
                resolve(false)
            }

            if (!user.token) {
                resolve(false);
            }

            try {
                var decodedQueried = jwt.verify(user.token, token.tokenSecret);
            } catch (err) {
                try {
                    let updatedUser = prisma.user.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            token: null,
                        },
                    });
                } catch (error) {
                    console.error('Error updating user token:', error);
                    resolve(false)
                }

                console.log('Error verifing token: ' + err)
                resolve(false)
            }
            if (decodedQueried.data == decodedProvided.data) resolve(true)
            else resolve(false)
        })
    }
}