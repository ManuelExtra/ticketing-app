import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import {BadRequestError, validateRequest} from '@mxticketing/common'

import { User } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')
],
validateRequest,
async (req: Request, res: Response) => {
    const {email, password} = req.body;
    
    // Check user
    const existingUser = await User.findOne({email});
    if(!existingUser){
        throw new BadRequestError('Bad credentials')
    }

    // Compare password
    const passwordsMatch = Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
        throw new BadRequestError('Bad credentials')
    }

    // Create jwt token
    const jwtToken = jwt.sign({
        id: existingUser._id,
        email: existingUser.email
    }, process.env.JWT_KEY!)

    
    // Save token
    req.session = {
        jwt: jwtToken
    }

    res.status(200).send(existingUser)
})

export {router as signinRouter};