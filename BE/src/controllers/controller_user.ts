import {Request, Response} from 'express';
import { Model_User } from '../models/model_user';

export class Controller_User {
    public static getAllUsers = async (req: Request, res: Response) => {
      try {
        const users = await Model_User.getAllUsers();
        return res.status(200).json(users);
      } catch (error) {
        return res.status(400).send(`Error getAllUsers: ${error}`);
      }
    }

    public static createUser = async (req: Request, res: Response) => {
      try {
        const user = req.body;
        const users = await Model_User.createUser(user);
        return res.status(200).json(users);
      } catch (error) {
        return res.status(400).send(`Error createUser: ${error}`);
      }
    }

    public static updateUser = async (req: Request, res: Response) => {
      try {
        const user = req.body;
        const users = await Model_User.updateUser(user);
        return res.status(200).json(users);
      } catch (error) {
        return res.status(400).send(`Error updateUser: ${error}`);
      }
    }
}