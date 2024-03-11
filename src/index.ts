// backend/index.ts
import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  config();
}

import express, { Express } from 'express';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';

import initializePassport from './config/passport-config';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';

const app: Express = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:8080',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}));

app.use(express.urlencoded({ extended : false }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

initializePassport(passport);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});