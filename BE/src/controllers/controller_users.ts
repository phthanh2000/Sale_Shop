import { Request, Response } from 'express';
import { Model_User } from '../models/model_users';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';

export class Controller_Users {
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
      const checkEmailIsRegister = await Model_User.checkEmailExists(data);
      if (typeof (checkEmailIsRegister) === 'undefined') {
        // Password encryption
        const ciphertext = data.pass;
        const secretKey = 'your_secret_key';
        const encryptedString = CryptoJS.AES.encrypt(ciphertext, secretKey).toString();
        data.pass = encryptedString;
        const user = await Model_User.createUser(data);
        return res.status(200).json(user);
      } else {
        return res.status(200).send('Email is used');
      }
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
      const checkUserIsExist = await Model_User.checkEmailExists(data);
      if (typeof (checkUserIsExist) !== 'undefined') {
        // Password decryption
        const encryptedString = checkUserIsExist.pass;
        const secretKey = 'your_secret_key';
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedString, secretKey);
        const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
        
        // Check the email and password entered are the same as the saved data
        const emailInputFromLoginForm = data.email;
        const passInputFromLoginForm = data.pass;
        const emailOfUserIsExistInDatabase = checkUserIsExist.email;
        const passOfUserIsExistInDatabase = decryptedString;
        if (emailInputFromLoginForm === emailOfUserIsExistInDatabase && passInputFromLoginForm === passOfUserIsExistInDatabase) {
          // Create token
          const payload = { userId: checkUserIsExist.id };
          const secretKey = 'your_secret_key';
          const options = { expiresIn: '8H' };
          const token = jwt.sign(payload, secretKey, options);
          return res.status(200).json(token);
        }
        return res.status(200).send('Login failed');
      } else {
        return res.status(200).send('User does not exists');
      }
    } catch (error) {
      return res.status(400).send(`API userLogin ${error}`);
    }
  }
}