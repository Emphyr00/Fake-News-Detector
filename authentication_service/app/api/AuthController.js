import prisma from "../database/prisma";
import PasswordHelper from "../utils/PasswordHelper";
import TokenHelper from "../utils/TokenHelper";

export default class AuthController {
    static async login(reqest, response) {
        try {
            let user = await prisma.user.findUnique({
                where: {
                    email: request.email,
                },
            });
        } catch (error) {
            console.error('Error querring user:', error);
            response.sendStatus(409)
            response.send(JSON.stringify({ 'error': 'Error while querring user' }));
            return;
        }

        if (user === null) {
            response.sendStatus(409)
            response.send(JSON.stringify({ 'error': 'User not found' }));
            return;
        }

        let passwordCompare = PasswordHelper.compare(reqest.password, user.password)

        if (passwordCompare === false) {
            response.sendStatus(409)
            response.send(JSON.stringify({ 'error': 'Password missmatch' }));
            return;
        }

        let token = TokenHelper.create(user.id)

        try {
            let updatedUser = await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    token: token,
                },
            });
        } catch (error) {
            console.error('Error updating user token:', error);
            response.sendStatus(409)
            response.send(JSON.stringify({ 'error': 'Error while updating user' }));
            return;
        }

        response.sendStatus(200)
        response.send(JSON.stringify({ token: token }))
        return;
    }
    static register(reqest, response) {

    }
    static logout(reqest, response) {

    }
}