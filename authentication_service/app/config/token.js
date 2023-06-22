// Setup .ENV file fetching
import * as dotenv from 'dotenv';
dotenv.config();

export default {
    tokenExpiration: process.env.TOKEN_EXPIRATION ?? 24,
    tokenSecret: process.env.TOKEN_SECRET ?? 'ligma`'
}