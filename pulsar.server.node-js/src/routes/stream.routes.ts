import { Router } from 'express';

import * as streamController from '../controller/stream.controller';

const router = Router();
import { isAuthenticated } from '../authentication/authorization-context';

router.post('/comment', isAuthenticated, streamController.postComment);
router.get('/comment/:channelName', streamController.getComment);
router.post('/initiate-stream', isAuthenticated, streamController.initiateStream);
router.post('/finish-stream', isAuthenticated, streamController.postFinishStream);
router.get('/', streamController.getAllStreams);
export const StreamRouter = router;
