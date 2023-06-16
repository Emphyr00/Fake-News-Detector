// Setup .ENV file fetching
import * as dotenv from 'dotenv';
dotenv.config();

export default {
    username: process.env.RABBIT_USERNAME ?? 'guest',
    password: process.env.RABBIT_PASSWORD ?? 'guest',
}