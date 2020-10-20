import { Router } from 'express';

import { isAuthenticated } from '../authentication/authorization-context';
import * as channelController from '../controller/channel.controller';

const router = Router();

router.post('/', isAuthenticated, channelController.postCreateChannel);
router.get('/current', isAuthenticated, channelController.getCurrentChannel);
router.get('/online-channels', channelController.getOnlineChannels);
router.get('/channel/:name/:stream?', channelController.getChannelByName);

export const ChannelRouter = router;
