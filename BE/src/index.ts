import express from 'express';
import router_user from './routes/routes_user';
import router_createdb from './routes/routes_createdb';

const app = express();
const PORT = process.env.PORT || 3001;

var cors = require('cors');
app.use(cors());

app.use('/users', router_user);
app.use('/db', router_createdb);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});