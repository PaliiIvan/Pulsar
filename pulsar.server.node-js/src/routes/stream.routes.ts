import { Router } from 'express';

import * as streamController from "../controller/stream.controller";

const router = Router();
import { isAuthenticated } from '../authentication/authorization-context';

router.post('/comment', streamController.postComment);
router.get('/comment/:channelName', streamController.getComment);

export const StreamRouter = router;