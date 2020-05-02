import { Router } from "express";

import * as channelController from "../controller/channel.controller";
const router = Router();
import { isAuthenticated } from "../authentication/authorization-context";

router.get('/current', isAuthenticated, channelController.getCurrentChannel);
router.post('/', channelController.postCreateChannel);
router.post('/initiate-stream', channelController.initiateStream)

export const ChannelRouter = router;