import express from 'express';
import { createServer } from 'http';
import appConfig from './config/app.js';
import HistoryController from './api/HistoryController.js';
import HistoryHelper from './utils/HistoryHelper.js';
import listen from './rabbitMQ/rabbitListener.js';
import cors from "cors";

var app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

console.log('HTTP server running on port ' + appConfig.httpPort);

listen('create-user-history', async (data) => {
    return HistoryHelper.create(data).then((data) => {
        return JSON.stringify(data)
    })
})

app.get('/api/history', async (req, res) => await HistoryController.get(req, res));

app.get('/api/predict/test', (req, res) => {
    res.send('Hello from history_service!');
});

var http = createServer(app).listen(appConfig.httpPort);

export default http;

