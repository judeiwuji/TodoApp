import { Router } from 'express';
import IndexController from '../controllers/IndexController';

const indexRoutes = Router();
const indexController = new IndexController();

indexRoutes.get('/', indexController.getHomePage);
export default indexRoutes;
