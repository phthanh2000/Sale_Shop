import { Request, Response } from 'express';
import { Model_Database } from '../models/model_databases';

export class Controller_Databases {
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

  // Requires insert default value into tables
  public static insertDefaultValueForTable = async (req: Request, res: Response) => {
    try {
      await Model_Database.insertDefaultValueForTable();
      return res.status(200).send(`Run insertDefaulValueForTable successfully !`);
    } catch (error) {
      res.status(400).send(`Error insertDefaulValueForTable: ${error}`);
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