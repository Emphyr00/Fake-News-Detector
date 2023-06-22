import * as amqp from 'amqplib'
import rabbit from '../config/rabbit.js';
import * as uuid from 'uuid'

export default function sendMessage(channelName, message, reply = true) {
    return new Promise(async (resolve, reject) => {
        try {
            const connection = await amqp.connect(`amqp://${rabbit.username}:${rabbit.password}@rabbitmq`);
            const channel = await connection.createChannel();

            const response = await channel.assertQueue(channelName)

            var correlationId = uuid.v4();
            if (reply) {
                channel.consume(response.queue, function (msg) {
                    if (msg.properties.correlationId == correlationId) {
                        setTimeout(function () {
                            channel.close();
                            connection.close();
                            console.log('Recived:' + msg.content.toString())
                            resolve(msg.content.toString())
                        }, 500);
                    }
                }, {
                    noAck: true
                });

                var options = {
                    correlationId: correlationId,
                    replyTo: response.queue
                }
            } else {
                var options = { correlationId: correlationId }
            }

            await channel.sendToQueue(channelName, Buffer.from(JSON.stringify(message)), options);
            // close the channel and connection

            if (!reply) {
                resolve(true)
            }
        } catch (error) {
            reject(error);
        }
    });
}