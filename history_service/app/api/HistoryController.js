import * as uuid from 'uuid';
import sendMessage from "../rabbitMQ/rabbitSender.js";
import prisma from '../database/prisma.js';

export default class HistoryController {
    static async get(request, response) {
        if (!request.query.token) {
            response.status(409)
            response.send(JSON.stringify({ 'error': "Token not provieded" }));
            return;
        }
        let authData = await sendMessage('check-auth', { token: request.query.token })
        authData = JSON.parse(authData)

        if (authData.status === false) {
            response.status(401)
            response.send(JSON.stringify({ 'error': "Unauthorized or token not valid" }));
            return;
        }

        let userHistory = await prisma.userHistoryEntry.findMany({
            where: {
                user_id: authData.user.id
            }
        });

        response.status(200)
        response.send(JSON.stringify({ 'data': userHistory }));
    }
}