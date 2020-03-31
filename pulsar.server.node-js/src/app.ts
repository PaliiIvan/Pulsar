import  express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

import { ChannelRouter } from "./routes/chanal.routes";

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
  next();
});
  


app.set("port", 8081);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(ChannelRouter);

app.use((err: any, req: Request, res: Response, next: any) => {
  console.log(err);
  return next();
});

mongoose.connect("mongodb://127.0.0.1:27017/Pulsar",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(res => {
        console.log("MongoDb status: Succes");
    })
    .catch(err => {
      console.log("Data base connection Error", err);
    });

export default app;