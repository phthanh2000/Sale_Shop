"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const routes_user_1 = __importDefault(require("./routes/routes_user"));
const routes_createdb_1 = __importDefault(require("./routes/routes_createdb"));
// Using express
const app = (0, express_1.default)();
// Port is used
const PORT = process.env.PORT || 3001;
// Middleware for parse and process json data from client
app.use((0, body_parser_1.json)());
// Middleware for allow access from other domains
app.use((0, cors_1.default)());
// Middleware for route routing
app.use('/users', routes_user_1.default);
app.use('/db', routes_createdb_1.default);
// Start an HTTP server and start listening for incoming requests from the specified port
// app.listen(port, [callback]);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
