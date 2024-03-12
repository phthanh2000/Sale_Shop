import { NextFunction, Request, Response } from 'express';
import jwt, { decode } from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';

export class Controller_Base {
  // Requires token authentication
  public static authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Test: Tokens will not be considered for authentication
    next();
    // Deverlopment: The token will be considered for authentication
    // try {
    //   // Get the token string after removing 'Bearer'
    //   const token = req.headers['authorization']?.split(' ')[1];
    //   // Token string type
    //   const secretKey = 'your_secret_key';
    //   // In case the token string is empty
    //   if (token == null) {
    //     return res.status(400).send('Token does not exist!');
    //   }
    //   // Perform token authentication
    //   jwt.verify(token, secretKey);
    //   // Successful authentication will continue to execute the next function
    //   next();
    // } catch (error) {
    //   return res.status(400).send(`API authenticateToken ${error}`);
    // };
  }

  // Requires send mail to reset password
  public static sendMailToResetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
        to: 'phucthanh.work@gmail.com',
        subject: 'Đặt lại mật khẩu',
        text: '',
        html: `<p>Xin chào ABC,</p>
               <p>Theo yêu cầu của bạn, chúng tôi đã gửi lại bạn thông tin mật mã tài khoản</p>
               <span>Password: </span ><strong>123456789</strong>
               <p>Cám ơn bạn và chúc bạn một ngày tốt lành.</p>
               <p>Kapi Store! </p>`
      };
      // Send mail
      const info = await transporter.sendMail(mailOptions);
      res.status(200).json(info);
    }
    catch (error) {
      res.status(400).send(`API senMailToResetPassword ${error}`);
    }
  }
}