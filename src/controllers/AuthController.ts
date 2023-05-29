import { Request, Response } from 'express';
import axios from 'axios';
import AppConfig from '../config/AppConfig';

export default class AuthController {
  static getLoginPage(req: Request, res: Response) {
    res.render('login', {
      page: {
        title: `Login - ${AppConfig.appName}`,
        description: 'Login to get access to your todos',
      },
    });
  }

  static getAuthLoginPage(req: Request, res: Response) {
    res.redirect(
      307,
      `${process.env.AUTH_HOST}/login?client=${process.env.AUTH_CLIENT_ID}`
    );
  }

  static async login(req: Request, res: Response) {
    try {
      const response = await axios.get(
        `${process.env.AUTH_HOST}/users/public/profile`,
        {
          headers: {
            Authorization: `Bearer ${req.query.code}`,
            'x-secret': process.env.AUTH_SECRET,
          },
        }
      );

      if (response.status !== 200) {
        req.flash('error', response.statusText);
        res.redirect('/login');
        return;
      }

      res.send(response.data);
      // check if user already exists
      // user exists goto dashboard
      // else add user to database
      // redirect to dashboard
    } catch (error: any) {
      req.flash('error', error.message);
      res.redirect('/login');
    }
  }
}
