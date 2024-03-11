// backend/routes/auth.ts
import express, { Router } from 'express';
import registerRouter from './register';
import loginRouter from './login';

const router: Router = express.Router();

router.use('/register', registerRouter);
router.use('/login', loginRouter);

export default router;