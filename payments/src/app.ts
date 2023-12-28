import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import { currentUser, errorHandler, NotFoundError } from "@mxticketing/common";
import cookieSession from "cookie-session";
import { createChargeRouter } from "./routes/new";

const app = express();

app.set("trust proxy", true); // traffics are being proxied to our server through ingress nginx
app.use(json());
app.use(
  cookieSession({
    signed: false, // disable encryption
    secure: process.env.NODE_ENV !== "test", // for https connection
  })
);

app.use(createChargeRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
