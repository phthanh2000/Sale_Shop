import {Request, Response} from 'express';
import { Model_CreateDB } from '../models/model_createdb';

export class Controller_CreateDB {
    public static createDatabase = async (req: Request, res: Response) => {
      try {
        const users = await Model_CreateDB.createDatabase();
        res.status(200).send(`Run createDatabase successfully !`);
      } catch (error) {
        res.status(400).send(`Error createDatabase: ${error}`);
      }
    }

    public static createTable = async (req: Request, res: Response) => {
        try {
          const users = await Model_CreateDB.createTable();
          res.status(200).send(`Run createTable successfully !`);
        } catch (error) {
          res.status(400).send(`Error createTable: ${error}`);
        }
    }

    public static deleteTable = async (req: Request, res: Response) => {
        try {
          const users = await Model_CreateDB.deleteTable();
          res.status(200).send(`Run deleteTable successfully !`);
        } catch (error) {
          res.status(400).send(`Error deleteTable: ${error}`);
        }
    }
}