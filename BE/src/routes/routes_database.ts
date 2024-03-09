import { Router } from 'express';
import { Controller_Database } from '../controllers/controller_database';

// Router create database
const router_database = Router();

router_database.post('/createDatabase', Controller_Database.createDatabase);
router_database.post('/createTable', Controller_Database.createTable);
router_database.delete('/deleteTable', Controller_Database.deleteTable);

export default router_database;