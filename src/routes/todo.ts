import { Router } from 'express';
import TodoController from '../controllers/TodoController';

const todoRoutes = Router();

todoRoutes.get('/dashboard', TodoController.getDashboardPage);
export default todoRoutes;
