import express from 'express';
import {  deleteInstructor, insertInstructor, listInstructor, updateInstructor } from './controller/instructor.controller';
import { AuthUserController } from './controller/auth-user.controller';

export function getRouter() {
    const router = express.Router();

    router.get('/instructor', listInstructor);
    router.get('/instructor/:id', );
    router.post('/instructor', insertInstructor);
    router.put('/instructor', updateInstructor);
    router.delete('/instructor/:id', deleteInstructor);

    const authUserController = new AuthUserController();
    router.post('/signup', authUserController.create);
    router.post('/login', authUserController.login);
        
    return router;
}