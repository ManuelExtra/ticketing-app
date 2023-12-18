import express from "express";
import 'express-async-errors';
import {json} from "body-parser";

import { errorHandler, NotFoundError } from "@mxticketing/common";
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


app.all('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler)

export {app}