import { Router } from "express";

import * as streamController from "../controllers/stream.controller";
const router = Router();

router.get('/stream', streamController.getGenerateStreamKey);
