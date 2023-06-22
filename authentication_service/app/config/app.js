// Setup .ENV file fetching
import * as dotenv from 'dotenv';
dotenv.config();

export default {
    httpPort: process.env.HTTP_PORT ?? 3000,
}