"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller_Users = void 0;
const model_users_1 = require("../models/model_users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_js_1 = __importDefault(require("crypto-js"));
class Controller_Users {
}
exports.Controller_Users = Controller_Users;
_a = Controller_Users;
// Requires get list users
Controller_Users.getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield model_users_1.Model_User.getUsers();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(400).send(`API getUsers ${error}`);
    }
});
// Requires create new user
Controller_Users.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const checkEmailIsRegister = yield model_users_1.Model_User.checkEmailExists(data);
        if (typeof (checkEmailIsRegister) === 'undefined') {
            // Password encryption
            const ciphertext = data.pass;
            const secretKey = 'your_secret_key';
            const encryptedString = crypto_js_1.default.AES.encrypt(ciphertext, secretKey).toString();
            data.pass = encryptedString;
            const user = yield model_users_1.Model_User.createUser(data);
            return res.status(200).json(user);
        }
        else {
            return res.status(200).send('Email is used');
        }
    }
    catch (error) {
        return res.status(400).send(`API createUser ${error}`);
    }
});
// Requires update user
Controller_Users.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const newData = req.body;
        const user = yield model_users_1.Model_User.updateUser(id, newData);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(400).send(`API updateUser ${error}`);
    }
});
// Requires delete user
Controller_Users.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield model_users_1.Model_User.deleteUser(id);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(400).send(`API deleteUser ${error}`);
    }
});
// Requires user login
Controller_Users.userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const checkUserIsExist = yield model_users_1.Model_User.checkEmailExists(data);
        if (typeof (checkUserIsExist) !== 'undefined') {
            // Password decryption
            const encryptedString = checkUserIsExist.pass;
            const secretKey = 'your_secret_key';
            const decryptedBytes = crypto_js_1.default.AES.decrypt(encryptedString, secretKey);
            const decryptedString = decryptedBytes.toString(crypto_js_1.default.enc.Utf8);
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
                const token = jsonwebtoken_1.default.sign(payload, secretKey, options);
                return res.status(200).json(token);
            }
            return res.status(200).send('Login failed');
        }
        else {
            return res.status(200).send('User does not exists');
        }
    }
    catch (error) {
        return res.status(400).send(`API userLogin ${error}`);
    }
});
