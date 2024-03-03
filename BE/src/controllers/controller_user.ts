import {Request, Response} from 'express';
import { Model_User } from '../models/model_user';

export class Controller_User {
    public static getUsers = async (req: Request, res: Response) => {
      try {
        const users = await Model_User.getUsers();
        return res.status(200).json(users);
      } catch (error) {
        return res.status(400).send(`API getUsers ${error}`);
      }
    }

    public static createUser = async (req: Request, res: Response) => {
      try {
        const data = req.body;
        const users = await Model_User.createUser(data);
        return res.status(200).json(users);
      } catch (error) {
        return res.status(400).send(`API createUser ${error}`);
      }
    }

    public static updateUser = async (req: Request, res: Response) => {
      try {
        const newData = req.body;
        const users = await Model_User.updateUser(newData);
        return res.status(200).json(users);
      } catch (error) {
        return res.status(400).send(`API updateUser ${error}`);
      }
    }

    public static deleteUser = async (req: Request, res: Response) => {
      try {
        const id = req.params.id;
        const users = await Model_User.deleteUser(id);
        return res.status(200).json(users);
      } catch (error) {
        return res.status(400).send(`API deleteUser ${error}`);
      }
    }
}