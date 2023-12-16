import express from "express";
import 'express-async-errors';
import {json} from "body-parser";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { currentUserRouter } from "./routes/current-user";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import cookieSession from 'cookie-session'

const app = express();

app.set('trust proxy', true) // traffics are being proxied to our server through ingress nginx
app.use(json());
app.use(
    cookieSession({
        signed: false, // disable encryption
        secure: process.env.NODE_ENV !== 'test' // for https connection
    })
)

app.use(signupRouter)
app.use(signinRouter)
app.use(currentUserRouter)
app.use(signoutRouter)

app.all('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler)

export {app}