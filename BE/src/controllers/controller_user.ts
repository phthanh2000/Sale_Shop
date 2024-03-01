import {Request, Response} from 'express';
import { Model_User } from '../models/model_user';

export class Controller_User {
    public static getAllUsers = async (req: Request, res: Response) => {
      try {
        const users = await Model_User.getAllUsers();
        return res.status(200).json(users);
      } catch (error) {
        return res.status(400).send(`API getAllUsers ${error}`);
      }
    }

    public static createUser = async (req: Request, res: Response) => {
      try {
        const user = req.body;
        const users = await Model_User.createUser(user);
        return res.status(200).json(users);
      } catch (error) {
        return res.status(400).send(`API createUser ${error}`);
      }
    }

    public static updateUser = async (req: Request, res: Response) => {
      try {
        const user = req.body;
        const users = await Model_User.updateUser(user);
        return res.status(200).json(users);
      } catch (error) {
        return res.status(400).send(`API updateUser ${error}`);
      }
    }

    public static deleteUser = async (req: Request, res: Response) => {
      try {
        const id = req.body.id;
        const users = await Model_User.deleteUser(id);
        return res.status(200).json(users);
      } catch (error) {
        return res.status(400).send(`API deleteUser ${error}`);
      }
    }
}