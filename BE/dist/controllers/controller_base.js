"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller_Base = void 0;
const nodemailer = __importStar(require("nodemailer"));
class Controller_Base {
}
exports.Controller_Base = Controller_Base;
_a = Controller_Base;
// Requires token authentication
Controller_Base.authenticateToken = (req, res, next) => {
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
};
// Requires send mail to reset password
Controller_Base.sendMailToResetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const info = yield transporter.sendMail(mailOptions);
        res.status(200).json(info);
    }
    catch (error) {
        res.status(400).send(`API senMailToResetPassword ${error}`);
    }
});
