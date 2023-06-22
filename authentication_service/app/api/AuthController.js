import { request } from "express";
import prisma from '../database/prisma.js'
import PasswordHelper from "../utils/PasswordHelper.js";
import TokenHelper from "../utils/TokenHelper.js";

export default class AuthController {
    static async login(request, response) {

        try {
            var user = await prisma.user.findFirst({
                where: {
                    email: request.body.email,
                },
            });
        } catch (error) {
            console.error('Error querring user:', error);
            response.status(409)
            response.send(JSON.stringify({ 'error': 'Error while querring user' }));
            return;
        }

        if (user === null) {
            response.status(409)
            response.send(JSON.stringify({ 'error': 'User not found' }));
            return;
        }

        let passwordCompare = PasswordHelper.compare(request.body.password, user.password)

        if (passwordCompare === false) {
            response.status(409)
            response.send(JSON.stringify({ 'error': 'Password missmatch' }));
            return;
        }

        let token = TokenHelper.create(user.id)

        try {
            var updatedUser = await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    token: token,
                },
            });
        } catch (error) {
            console.log('Error updating user token:', error);
            response.status(409)
            response.send(JSON.stringify({ 'error': 'Error while updating user' }));
            return;
        }

        if (token) {
            response.status(200)
            response.send(JSON.stringify({ token: token }))
            return;
        }
    }
    static async register(request, response) {

        console.log(request.body.email)

        var user = await prisma.user.findFirst({
            where: {
                email: request.body.email,
            },
        });

        if (user !== null) {
            response.status(409)
            response.send(JSON.stringify({ 'error': 'User with given email already exists' }));
            return;
        }
        try {
            const newUser = await prisma.user.create({
                data: {
                    name: request.body.name,
                    email: request.body.email,
                    password: await PasswordHelper.hash(request.body.password),
                    token: null,
                },
            });
        } catch (error) {
            console.error('Error creating user:', error);
            response.status(409)
            response.send(JSON.stringify({ 'error': 'Error creating user' }));
            return;
        }

        response.status(201)
        response.send(JSON.stringify({ 'success': 'User created' }));
        return;
    }
    static async logout(request, response) {

        let tokenCheck = await TokenHelper.verify(request.body.token)

        if (tokenCheck == false) {
            response.status(409)
            response.send(JSON.stringify({ 'error': 'Token not valid' }));
            return;
        }

        let userId = TokenHelper.decode(request.body.token).data;

        try {
            let updatedUser = await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    token: null,
                },
            });
        } catch (error) {
            console.log('Error updating user token:', error);
            response.status(409)
            response.send(JSON.stringify({ 'error': 'Error updating user token' }));
            return;
        }

        response.status(200)
        response.send(JSON.stringify({ 'message': 'Logged out' }));

    }
}