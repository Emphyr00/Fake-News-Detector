import client from 'amqplib'
import rabbit from '../config/rabbit.js';
import TokenHelper from '../utils/TokenHelper.js';

client.connect(`amqp://${rabbit.username}:${rabbit.password}@rabbitmq`, function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, createdChannel) {
        if (error1) {
            throw error1;
        }

        var queue = 'check-auth';
        createdChannel.assertQueue(queue, {
            durable: false
        });

        createdChannel.consume(queue, function reply(msg) {
            const receivedMsg = msg.content.toString();

            console.log("Received message: ", receivedMsg);

            const response = TokenHelper.verify(receivedMsg);

            channel.sendToQueue(msg.properties.replyTo,
                Buffer.from(response.toString()), {
                correlationId: msg.properties.correlationId
            });

            channel.ack(msg);
        });
    });
});