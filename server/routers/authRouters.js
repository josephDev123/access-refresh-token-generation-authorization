import {Router} from 'express';
import {loginController, registerController} from '../controllers/authControllers.js'

export const authRouters = Router();

authRouters.post('/login', loginController);

authRouters.post('/register', registerController);

