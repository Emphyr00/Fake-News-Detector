import * as uuid from 'uuid';
import sendMessage from "../rabbitMQ/rabbitSender.js";

export default class PredictController {
    static async predictText(request, response) {
        if (!request.body.token) {
            response.status(409)
            response.send(JSON.stringify({ 'error': "Token not provieded" }));
            return;
        }
        let authData = await sendMessage('check-auth', { token: request.body.token })
        authData = JSON.parse(authData)

        if (authData.status === false) {
            response.status(401)
            response.send(JSON.stringify({ 'error': "Unauthorized or token not valid" }));
            return;
        }

        let predictionResult = await sendMessage('predict', { text: request.body.text }, true)
        console.log(predictionResult)

        await sendMessage('create-user-history', { user: authData.user, text: request.body.text, prediction: predictionResult }, false)

        console.log('test')

        response.status(200)
        response.send(JSON.stringify({ 'message': predictionResult }));
        return;
    }
}