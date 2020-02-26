import express from "express";
import bodyParser from "body-parser";

import path from "path";
import mongoose from "mongoose";
import { errorHandling } from "./middleware/application-error.middleware";
//import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
import { AuthRouters } from "./routes/auth.routes";
// Create Express server
const app = express();

// Connect to MongoDB
app.set("port", process.env.PORT || 3001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(AuthRouters);
app.use(errorHandling);
app.use((req, res, next) => {
    console.log(req.url, req.body, req.method);
    next();
})


// Express configuration
mongoose.connect("mongodb://127.0.0.1:27017/Pulsar",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(res => {
        console.log("MongoDb status: Succes");
    })
    .catch(err => {
        console.error(err);
    });

export default app;
