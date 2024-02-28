"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_user_1 = __importDefault(require("./routes/routes_user"));
const routes_createdb_1 = __importDefault(require("./routes/routes_createdb"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
var cors = require('cors');
app.use(cors());
app.use('/users', routes_user_1.default);
app.use('/db', routes_createdb_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
