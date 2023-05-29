import { Request, Response } from 'express';

export default class IndexController {
  static getHomePage(req: Request, res: Response) {
    res.render('index', {
      page: {
        title: 'Todo',
        description: 'A Todo List application',
      },
      path: req.path,
    });
  }
}
