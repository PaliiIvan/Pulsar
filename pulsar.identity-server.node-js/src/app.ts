import express from "express";
import bodyParser from "body-parser";

import path from "path";
import mongoose from "mongoose";
//import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
import { senDataFromTs } from "./controllers/test";

// Create Express server
const app = express();

// Connect to MongoDB
app.use('test', senDataFromTs);

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default app;
