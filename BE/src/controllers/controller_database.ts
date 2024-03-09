import { Request, Response } from 'express';
import { Model_Database } from '../models/model_database';

export class Controller_Database {
  // Requires create new database
  public static createDatabase = async (req: Request, res: Response) => {
    try {
      await Model_Database.createDatabase();
      res.status(200).send(`Run createDatabase successfully !`);
    } catch (error) {
      res.status(400).send(`Error createDatabase: ${error}`);
    }
  }

  // Requires create new tables
  public static createTable = async (req: Request, res: Response) => {
    try {
      await Model_Database.createTable();
      res.status(200).send(`Run createTable successfully !`);
    } catch (error) {
      res.status(400).send(`Error createTable: ${error}`);
    }
  }

  // Requires delete tables
  public static deleteTable = async (req: Request, res: Response) => {
    try {
      await Model_Database.deleteTable();
      res.status(200).send(`Run deleteTable successfully !`);
    } catch (error) {
      res.status(400).send(`Error deleteTable: ${error}`);
    }
  }
}