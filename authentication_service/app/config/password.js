// Setup .ENV file fetching
import * as dotenv from 'dotenv';
dotenv.config();

export default {
    saltRounds: process.env.PASS_SALT_ROUNDS ?? 10,
}