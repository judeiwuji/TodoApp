import { Router } from 'express';
import TodoController from '../controllers/TodoController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const todoRoutes = Router();

todoRoutes.get(
  '/dashboard',
  ensureAuthenticated,
  TodoController.getDashboardPage
);
export default todoRoutes;
