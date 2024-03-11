import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { checkNotAuthenticated } from '../../middleware/authMiddleware';
import { loginValidationRules } from '../../middleware/validation';
import { validationResult } from 'express-validator';

const router = express.Router();

router.post('/', checkNotAuthenticated, loginValidationRules(), (req: Request, res: Response, next: NextFunction) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) { return next(err); }
    if (!user) { return res.status(401).json({ message: info.message }); }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.json({ message: 'Logged in successfully' });
    });
  })(req, res, next);
});

export default router;