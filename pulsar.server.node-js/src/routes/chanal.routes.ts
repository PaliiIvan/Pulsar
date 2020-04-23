import { Router } from "express";

import * as channelController from "../controller/channel.controller";
const router = Router();
import { isAuthenticated } from "../authentication/authorization-context";

router.get('/current', isAuthenticated, channelController.getCurrentChannel)
router.post('/', channelController.postCreateChannel);

export const ChannelRouter = router;