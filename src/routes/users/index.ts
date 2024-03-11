import express, { Router } from 'express';
import getUserRoute from './getUser';

//const createUserRoute = require('./createUser');
//const updateUserRoute = require('./updateUser');
//const deleteUserRoute = require('./deleteUser');

const router: Router = express.Router();
router.use('/getUser', getUserRoute);
//router.use(createUserRoute);
//router.use(updateUserRoute);
//router.use(deleteUserRoute);

export default router;