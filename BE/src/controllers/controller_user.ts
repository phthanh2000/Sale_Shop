import { Request, Response } from 'express';
import { Model_User } from '../models/model_user';
import jwt from 'jsonwebtoken';

export class Controller_User {
  // Requires get list users
  public static getUsers = async (req: Request, res: Response) => {
    try {
      const users = await Model_User.getUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).send(`API getUsers ${error}`);
    }
  }

  // Requires create new user
  public static createUser = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const user = await Model_User.createUser(data);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).send(`API createUser ${error}`);
    }
  }

  // Requires update user
  public static updateUser = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const newData = req.body;
      const user = await Model_User.updateUser(id, newData);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).send(`API updateUser ${error}`);
    }
  }

  // Requires delete user
  public static deleteUser = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user = await Model_User.deleteUser(id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).send(`API deleteUser ${error}`);
    }
  }

  // Requires user login
  public static userLogin = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const user = await Model_User.getUserForNameAndPassword(data);
      if (typeof (user) !== "undefined") {
        const payload = { userId: user.id };
        const secretKey = 'your_secret_key';
        const options = { expiresIn: '8H' };
        const token = jwt.sign(payload, secretKey, options);
        return res.status(200).json(token);
      } else {
        return res.status(400).send('Login failed!');
      }
    } catch (error) {
      return res.status(400).send(`API userLogin ${error}`);
    }
  }
}