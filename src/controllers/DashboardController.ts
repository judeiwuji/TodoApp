import { Request, Response } from 'express';

export default class DashboardController {
  static getDashboardPage(req: Request, res: Response) {
    res.render('dashboard', {
      page: {
        title: 'My Todos - Todoist',
        description: 'Start organizing your tasks',
      },
      path: req.path,
    });
  }
}
