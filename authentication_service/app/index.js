import express from 'express';
import { createServer } from 'http';
import appConfig from './config/app.js';
import AuthController from './api/AuthController.js';

var app = express();
var http = createServer(app).listen(appConfig.httpPort);
console.log('HTTP server running on port ' + appConfig.httpPort);

app.post('/api/auth/login', (req, res) => AuthController.login(req, res));

app.post('/api/auth/register', (req, res) => AuthController.login(req, res));

app.post('/api/auth/logout', (req, res) => AuthController.login(req, res));

export default http;

