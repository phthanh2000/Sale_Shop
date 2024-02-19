import { Router } from 'express';
import { Controller_CreateDB } from '../controllers/controller_createdb';

const router_createdb = Router();

router_createdb.get('/createDatabase', Controller_CreateDB.createDatabase);
router_createdb.get('/createTable', Controller_CreateDB.createTable);
router_createdb.get('/deleteTable', Controller_CreateDB.deleteTable);

export default router_createdb;