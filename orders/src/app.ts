import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import { errorHandler, NotFoundError } from "@mxticketing/common";
import cookieSession from "cookie-session";
import { createOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";
import { indexOrderRouter } from "./routes";
import { deleteOrderRouter } from "./routes/delete";

const app = express();

app.set("trust proxy", true); // traffics are being proxied to our server through ingress nginx
app.use(json());
app.use(
  cookieSession({
    signed: false, // disable encryption
    secure: process.env.NODE_ENV !== "test", // for https connection
  })
);


app.use(createOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
