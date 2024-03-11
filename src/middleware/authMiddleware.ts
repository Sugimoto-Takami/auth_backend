//  backend/src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';

function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ message: "Not authenticated" });
}

function checkNotAuthenticated(req: Request, res: Response, next: NextFunction) {
    console.log("checkNotAuthenticated is called");
    if (req.isAuthenticated()) {
        console.log("req.isAuthenticated() is TRUE");
        return res.status(403).json({ message: "Already authenticated" });
    }
    console.log("req.isAuthenticated() is FALSE");
    next();
}

export { checkAuthenticated, checkNotAuthenticated };