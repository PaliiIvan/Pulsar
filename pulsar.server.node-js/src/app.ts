import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import * as auhtMiddleware from "./middleware/authentication.middleware";
import { Request, Response, NextFunction } from "express";

import { ChannelRouter } from "./routes/chanal.routes";
import { errorHandling } from "./middleware/application-error.middleware";

const app = express();

app.use((req, res, next) => {
  console.log(req.body);
  console.log("Helllo");
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
      return res.status(200).json({});
  };
  return next();
});
  
//#region Application constants

app.set("port", 8081);

//#endregion


//#region Middlevare

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(auhtMiddleware.useAuthentication);

//#endregion


//#region Routes

app.use("/channel", ChannelRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({error: 'Url not found'});
  return next();
})

//#endregion


//#region Error Handling

app.use(errorHandling);

//#endregion

mongoose.connect("mongodb://127.0.0.1:27017/Pulsar",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(res => {
        console.log("MongoDb: Connected");
    })
    .catch(err => {
      console.log("MongoDb: ", err);
    });

export default app;