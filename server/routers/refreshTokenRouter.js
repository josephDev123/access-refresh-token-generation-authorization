import {Router} from 'express';
import {refresh} from '../controllers/refreshTokenControllers.js'

export const refreshRouter = Router();

refreshRouter.post('/refresh', refresh);