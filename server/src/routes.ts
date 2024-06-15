import express from 'express';
import {  deleteUser, insertUser, listUser, updateUser  } from './controller/user.controller';
import {  deleteInstructor, insertInstructor, listInstructor, updateInstructor } from './controller/instructor.controller';
import { AuthUserController } from './controller/auth-user.controller';

export function getRouter() {
    const router = express.Router();

    router.get('/user', listUser);
    router.get('/user/:id', );
    router.post('/user', insertUser);
    router.put('/user', updateUser);
    router.delete('/user/:id', deleteUser);

    router.get('/item', listInstructor);
    router.get('/item/:id', );
    router.post('/item', insertInstructor);
    router.put('/item', updateInstructor);
    router.delete('/item/:id', deleteInstructor);

    const authUserController = new AuthUserController();
    router.post('/signup', authUserController.create);
    router.post('/login', authUserController.login);
        
    return router;
}