import { Request, Response } from 'express';

export default class TodoController {
  static getDashboardPage(req: Request, res: Response) {
    res.render('todos/dashboard', {
      page: {
        title: 'My Todos - Todoist',
        description: 'Start organizing your tasks',
      },
      path: req.path,
    });
  }
}
