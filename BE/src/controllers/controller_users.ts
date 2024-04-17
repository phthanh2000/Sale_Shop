import { Request, Response } from 'express';
import { Model_User } from '../models/model_users';
import jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
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

        // Check email and password from login form is correct with value in database
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

  // Requires forget password
  public static forgetPasswordUser = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const checkUserIsExist = await Model_User.checkEmailExists(data);
      if (typeof (checkUserIsExist) !== 'undefined') {
        // Create token
        const payload = { userId: checkUserIsExist.id };
        const secretKey = 'your_secret_key';
        const options = { expiresIn: '30m' };
        const token = await jwt.sign(payload, secretKey, options);
        const link = `http://localhost:3000/reset-password/${token}`;

        const name = checkUserIsExist.name;
        const email = checkUserIsExist.email;

        // Define your email account information
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'thanhcamera1601@gmail.com',
            pass: 'qoldgnxdqaeyujrl'
          }
        });

        // Define email information
        const mailOptions = {
          from: 'thanhcamera1601@gmail.com',
          to: `${email}`,
          subject: 'Đặt lại mật khẩu',
          text: '',
          html: `
          <!DOCTYPE html>
                <html lang="en">
                  <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                    .button {
                      font-family: Arial, sans-serif;
                      display: inline-block;
                      padding: 10px 20px;
                      background-color: #007bff;
                      color: #ffffff !important;
                      text-decoration: none;
                      border-radius: 10px;
                    }
                    
                    .button:hover {
                      background-color: #0056b3;
                    }
                  </style>
                  <body>
                    <p>Xin chào ${name},</p>
                    <p>Gần đây bạn đã yêu cầu đặt lại mật khẩu cho tài khoản. Nhấp vào nút bên dưới để tiếp tục:</p>
                    <a class="button" href="${link}"  target="_blank">Đặt lại mật khẩu</a>
                    <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này hoặc trả lời để cho chúng tôi biết. Liên kết đặt lại mật khẩu này chỉ có hiệu lực trong 30 phút tiếp theo.</p>
                    <p>Vui lòng đăng nhập để thay đổi lại mật khẩu.</p>
                    <p>Cám ơn và chúc bạn một ngày tốt lành.</p>
                    <p>Kapi Store!</p>
                  </body>
                </html>`
        };

        // Send mail
        await transporter.sendMail(mailOptions);
        res.status(200).json('Send mail successful');
      } else {
        return res.status(200).send('User does not exists');
      }
    }
    catch (error) {
      res.status(400).send(`API forgetPasswordUser ${error}`);
    }
  }

  // Requires check token expired
  public static checkTokenExpired = async (req: Request, res: Response) => {
    try {
      // Get token from url reset password
      const data = req.body;

      // Decode token
      const decodedToken = jwt.decode(data.token);

      // Check token after decode is valuable
      if (typeof decodedToken === 'object' && decodedToken !== null && 'exp' in decodedToken) {
        // Get expired time 
        const tokenExpiration = (decodedToken as jwt.JwtPayload).exp;

        // Get current time
        const currentTime = Math.floor(Date.now() / 1000); // Convert mili to s time

        // Compare time 
        if (tokenExpiration && tokenExpiration < currentTime) {
          return res.status(200).send('Token has expired');
        } else {
          return res.status(200).json(decodedToken.userId);
        }
      }
    } catch (error) {
      res.status(400).send(`API resetPasswordUser ${error}`);
    }
  }

  // Requires reset password
  public static resetPasswordUser = async (req: Request, res: Response) => {
    try {
      // Get data
      const data = req.body;

      // Check user exist in database
      const checkUserExist = await Model_User.checkUserForId(data.id);
      if (checkUserExist !== undefined) {
        // Password encryption
        const ciphertext = data.pass;
        const secretKey = 'your_secret_key';
        const encryptedString = CryptoJS.AES.encrypt(ciphertext, secretKey).toString();
        const newData = {
          pass: encryptedString
        }
        const user = await Model_User.updateUser(checkUserExist.id, newData);
        return res.status(200).json(user);
      } else {
        return res.status(200).send('User not exists');
      }
    } catch (error) {
      res.status(400).send(`API resetPasswordUser ${error}`);
    }
  }
}