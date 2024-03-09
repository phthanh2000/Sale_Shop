import { Router } from 'express';
import { Controller_Databases } from '../controllers/controller_databases';

// Router create database
const router_database = Router();

router_database.post('/createDatabase', Controller_Databases.createDatabase);
router_database.post('/createTable', Controller_Databases.createTable);
router_database.delete('/deleteTable', Controller_Databases.deleteTable);

export default router_database;