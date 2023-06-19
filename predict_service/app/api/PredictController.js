import * as uuid from 'uuid';
import sendMessage from "../rabbitMQ/rabbitSender.js";

export default class PredictController {
    static async predict(request, response) {
        let message = await sendMessage('check-auth', request.body.token)

        response.status(200)
        response.send(JSON.stringify({ 'message': message }));
    }
}