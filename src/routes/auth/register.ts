// backend/routes/auth/register.ts
import express, { Request, Response } from 'express';
import pool from '../../db';
import bcrypt from 'bcrypt';
import { checkNotAuthenticated } from '../../middleware/authMiddleware';
import { registerValidationRules } from '../../middleware/validation';
import { validationResult } from 'express-validator';

const router = express.Router();

router.post('/', checkNotAuthenticated, registerValidationRules(), async(req: Request, res: Response) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const id = Date.now().toString();
        const insertQuery = 'INSERT INTO useruser (id, name, email, password) VALUES ($1, $2, $3, $4)';
        const values = [id, name, email, hashedPassword];  
        await pool.query(insertQuery, values);
        res.status(201).json({ message: "User registered" });
    } catch (e) {
        // test
        console.log("Failure to register", e);
        res.status(400).json({ message: "Failure to register" });
    }
});

export default router;