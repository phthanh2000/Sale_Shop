import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import router_user from './routes/routes_user';
import router_database from './routes/routes_database';

// Using express
const app = express();

// Port is used
const PORT = process.env.PORT || 3001;

// Middleware for parse and process json data from client
app.use(json());
// Middleware for allow access from other domains
app.use(cors());

// Middleware for route routing
app.use('/users', router_user);
app.use('/database', router_database);

// Start an HTTP server and start listening for incoming requests from the specified port
// app.listen(port, [callback]);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});