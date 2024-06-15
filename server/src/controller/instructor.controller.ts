import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { MongoService } from './base.controller';

const mongoService = new MongoService("instructor");

export async function insertInstructor(req: Request, res: Response): Promise<void> {
    try {
        delete req.body._id;
        const { name, department, email, subjectTaught} = req.body;
        const instructor = {
          name, department, email, subjectTaught
        }
        await mongoService.insertOneCollection(instructor, res);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        res.status(500).send('Internal server error');
    }
}

export async function listInstructor(req: Request, res: Response): Promise<void> {
    try {
        await mongoService.listCollection(req, res);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        res.status(500).send('Internal server error');
    }
}

export async function updateInstructor(req: Request, res: Response): Promise<void> {
    try {
        await mongoService.updateOneCollection(req, res);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        res.status(500).send('Internal server error');
    }
}

export async function deleteInstructor(req: Request, res: Response): Promise<void> {
    try {
        delete req.body._id;
        const {  name, department, email, subjectTaught } = req.body;
        const instructor = {
          name, department, email, subjectTaught
        }
        await mongoService.deleteOneCollection(instructor, res);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        res.status(500).send('Internal server error');
    }
}
