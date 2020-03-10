import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { errorHandling } from "./middleware/application-error.middleware";
import { AuthRouters } from "./routes/auth.routes";
import logger from "./util/logger";


const app = express();


app.set("port", process.env.PORT || 3001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(AuthRouters);
app.use(errorHandling);

mongoose.connect("mongodb://127.0.0.1:27017/Pulsar",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(res => {
        console.log("MongoDb status: Succes");
    })
    .catch(err => {
        logger.error("Data base connection Error", err);
    });

export default app;
