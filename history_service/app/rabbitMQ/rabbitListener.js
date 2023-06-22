import * as amqp from 'amqplib'
import rabbit from '../config/rabbit.js';

export default function listen(channelName, callback) {
    return new Promise(async (resolve, reject) => {
        try {
            const connection = await amqp.connect(`amqp://${rabbit.username}:${rabbit.password}@rabbitmq`);
            const channel = await connection.createChannel();

            const response = await channel.assertQueue(channelName)
            channel.prefetch(1);

            await channel.consume(channelName, data => {
                var recived = JSON.parse(data.content)

                console.log(recived)

                const content = callback(recived).then((result) => {
                    if (data.properties.replyTo) {
                        channel.sendToQueue(data.properties.replyTo,
                            Buffer.from(String(result)), {
                            correlationId: data.properties.correlationId
                        });
                    }
                })

                channel.ack(data)
            })
        } catch (error) {
            reject(error);
        }
    });
}