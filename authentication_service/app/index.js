import express from 'express';
import { createServer } from 'http';
import appConfig from './config/app.js';
import AuthController from './api/AuthController.js';
import listen from './rabbitMQ/rabbitListener.js';
import TokenHelper from './utils/TokenHelper.js';

var app = express();
app.use(express.json());

listen('check-auth', async (data) => {
    return await TokenHelper.verify(data).then((data) => {
        console.log('test ' + data)
        return data
    })
})

console.log('HTTP server running on port ' + appConfig.httpPort);

app.post('/api/auth/login', async (req, res) => await AuthController.login(req, res));

app.post('/api/auth/register', async (req, res, next) => AuthController.register(req, res));

app.post('/api/auth/logout', async (req, res) => await AuthController.logout(req, res));

app.get('/api/auth/test', (req, res) => {
    res.send('Hello from authentication_service!');
});

var http = createServer(app).listen(appConfig.httpPort);

export default http;

