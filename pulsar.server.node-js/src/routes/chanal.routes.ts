import { Router } from "express";

import * as channelController from "../controller/channel.controller";
const router = Router();


router.post('/create-channel', channelController.postCreateChannel);

export const ChannelRouter = router;