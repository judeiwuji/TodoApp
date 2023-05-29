import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const authRoutes = Router();
authRoutes.get('/login', AuthController.getLoginPage);
authRoutes.get('/login/auth/internetpassport', AuthController.getAuthLoginPage);
authRoutes.get('/login/auth/', AuthController.login);
export default authRoutes;
