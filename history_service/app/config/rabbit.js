// Setup .ENV file fetching
import * as dotenv from 'dotenv';
dotenv.config();

export default {
    url: process.env.RABBIT_URL ?? 'rabbitmq',
    username: process.env.RABBIT_USERNAME ?? 'guest',
    password: process.env.RABBIT_PASSWORD ?? 'guest',
}