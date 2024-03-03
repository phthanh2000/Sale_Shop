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
exports.Controller_User = void 0;
const model_user_1 = require("../models/model_user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Controller_User {
}
exports.Controller_User = Controller_User;
_a = Controller_User;
Controller_User.getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield model_user_1.Model_User.getUsers();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(400).send(`API getUsers ${error}`);
    }
});
Controller_User.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const user = yield model_user_1.Model_User.createUser(data);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(400).send(`API createUser ${error}`);
    }
});
Controller_User.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = req.body;
        const user = yield model_user_1.Model_User.updateUser(newData);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(400).send(`API updateUser ${error}`);
    }
});
Controller_User.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield model_user_1.Model_User.deleteUser(id);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(400).send(`API deleteUser ${error}`);
    }
});
Controller_User.checkUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const user = yield model_user_1.Model_User.checkUser(data);
        if (typeof (user) !== "undefined") {
            const payload = { userId: user.id };
            const secretKey = 'your_secret_key';
            const options = { expiresIn: '8h' };
            const token = jsonwebtoken_1.default.sign(payload, secretKey, options);
            return res.status(200).json(token);
        }
        else {
            return res.status(401).json({ message: 'Authentication failed' });
        }
    }
    catch (error) {
        return res.status(400).send(`API checkUser ${error}`);
    }
});
