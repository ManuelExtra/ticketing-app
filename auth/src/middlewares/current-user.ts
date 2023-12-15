import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

// interface UserPayload{
//     id: stri
// }

// declare global{
//     namespace Express{
//         interface Request {
//             currentUser?: 
//         }
//     }
// }

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session?.jwt){
        next()
    }

    try {
        // const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!)
        // req.currentUser = payload;
    } catch (error) {
    }

    next()
}