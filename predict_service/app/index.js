import express from 'express';
import { createServer } from 'http';
import appConfig from './config/app.js';
import PredictController from './api/PredictController.js';

var app = express();
app.use(express.json());

console.log('HTTP server running on port ' + appConfig.httpPort);

app.post('/api/predict/text', async (req, res) => await PredictController.predict(req, res));

// app.post('/api/auth/register', async (req, res, next) => AuthController.register(req, res));

// app.post('/api/auth/logout', async (req, res) => await AuthController.logout(req, res));

app.get('/api/predict/test', (req, res) => {
    res.send('Hello from predict_service!');
});

var http = createServer(app).listen(appConfig.httpPort);

export default http;

