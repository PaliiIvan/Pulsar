import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import logger from "./util/logger";
import { errorHandling } from "./middleware/application-error.middleware";
import { AuthRouters } from "./routes/auth.routes";
import * as secrets from './configs/secrets';

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.set("port", process.env.PORT || 3001);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(AuthRouters);

app.use(errorHandling);



mongoose.connect(secrets.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'Pulsar'
    })
    .then(res => {
        console.log("MongoDb status: Succes");
    })
    .catch(err => {
        logger.error("Data base connection Error", err);
    });

export default app;
