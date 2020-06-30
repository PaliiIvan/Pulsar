import { Router } from 'express';

import * as channelController from '../controller/channel.controller';
const router = Router();
import { isAuthenticated } from '../authentication/authorization-context';

router.get('/current', isAuthenticated, channelController.getCurrentChannel);
router.post('/initiate-stream', channelController.initiateStream);
router.get('/online-channels', channelController.getOnlineChannels);
router.post('/', channelController.postCreateChannel);
router.get('/channel/:name', channelController.getChannelByName);
export const ChannelRouter = router;