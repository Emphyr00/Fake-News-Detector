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

    static async verify(providedToken) {
        try {
            var decodedProvided = jwt.verify(providedToken, token.tokenSecret);
        } catch (err) {
            console.log('Error verifing token: ' + err)
            return false
        }

        console.log(decodedProvided.data)

        try {
            var user = await prisma.user.findUnique({
                where: {
                    id: decodedProvided.data,
                },
            });
        } catch (error) {
            console.error('Error querring user:', error);
            return false
        }

        if (!user.token) {
            return false;
        }

        try {
            var decodedQueried = jwt.verify(user.token, token.tokenSecret);
        } catch (err) {
            try {
                let updatedUser = await prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        token: null,
                    },
                });
            } catch (error) {
                console.error('Error updating user token:', error);
                return false
            }

            console.log('Error verifing token: ' + err)
            return false
        }

        return decodedQueried.data == decodedProvided.data ? true : false
    }
}