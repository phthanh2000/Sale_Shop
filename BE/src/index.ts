import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import router_users from './routes/routes_users';
import router_databases from './routes/routes_databases';

// Using express
const app = express();

// Port is used
const PORT = process.env.PORT || 3001;

// Middleware for parse and process json data from client
app.use(json());
// Middleware for allow access from other domains
app.use(cors());

// Middleware for route routing
app.use('/users', router_users);
app.use('/databases', router_databases);

// Start an HTTP server and start listening for incoming requests from the specified port
// app.listen(port, [callback]);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});