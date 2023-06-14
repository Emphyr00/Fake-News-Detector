import jwt from "jsonwebtoken";
import token from "../config/token";

export default class TokenHelper {
    static create(userId) {
        return jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (token.tokenExpiration * 60 * 60),
            data: userId
        }, token.tokenSecret);
    }

    static verify(token, userId) {
        try {
            var decoded = jwt.verify(token, token.tokenSecret);
        } catch (err) {
            console.log('Error verifing token: ' + err)
            return false
        }

        return userId.toString() == decoded ? true : false
    }
}