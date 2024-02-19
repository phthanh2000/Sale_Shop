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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller_User = void 0;
const model_user_1 = require("../models/model_user");
class Controller_User {
}
exports.Controller_User = Controller_User;
_a = Controller_User;
Controller_User.getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield model_user_1.Model_User.getAllUsers();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(400).send(`Error getAllUsers: ${error}`);
    }
});
Controller_User.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const users = yield model_user_1.Model_User.createUser(user);
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(400).send(`Error createUser: ${error}`);
    }
});
Controller_User.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const users = yield model_user_1.Model_User.updateUser(user);
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(400).send(`Error updateUser: ${error}`);
    }
});
Controller_User.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const users = yield model_user_1.Model_User.deleteUser(id);
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(400).send(`Error deleteUser: ${error}`);
    }
});
