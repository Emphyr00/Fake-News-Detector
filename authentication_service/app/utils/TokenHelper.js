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
        console.log(providedToken)
        return await new Promise((resolve, reject) => {
            try {
                var decodedProvided = jwt.verify(providedToken, token.tokenSecret);
            } catch (err) {
                console.log('Error verifing token: ' + err)
                resolve({ 'status': false, "user": null })
            }

            prisma.user.findUnique({
                where: {
                    id: decodedProvided.data,
                },
            }).then((user) => {
                if (!user.token) {
                    resolve({ 'status': false, "user": user })
                }

                try {
                    var decodedQueried = jwt.verify(user.token, token.tokenSecret);
                } catch (err) {
                    prisma.user.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            token: null,
                        },
                    }).then((updatedUser) => {
                        console.log('Error verifing token2: ' + err)
                        resolve({ 'status': false, "user": user })
                    }).catch((error) => {
                        console.error('Error updating user token:', error);
                        resolve({ 'status': false, "user": user })
                    })
                }

                if (decodedQueried.data == decodedProvided.data) resolve({ 'status': true, "user": user })
                else resolve({ 'status': false, "user": user })
            }).catch((error) => {
                console.error('Error querring user:', error);
                resolve({ 'status': false, "user": user })
            })
        })
    }
}