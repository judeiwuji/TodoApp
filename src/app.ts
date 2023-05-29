const dateFormat = require('handlebars-dateformat');
import cookieParser from 'cookie-parser';
import connectFlash from 'connect-flash';
import express, { Application } from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import session from 'express-session';
import { config } from 'dotenv';
import morgan from 'morgan';
import HandlebarsUtil from './utils/HandlebarsUtil';
import RouteManager from './routes/RouteManager';
config();

class App {
  private app!: Application;
  private port = process.env.PORT || 5000;

  constructor() {
    this.app = express();
    this.middlewares();
    this.locals();
    this.settings();
  }

  locals() {
    this.app.use((req, res, next) => {
      res.locals.info = req.flash('info');
      res.locals.error = req.flash('error');

      next();
    });
  }

  middlewares() {
    this.app.use(morgan('dev'));
    this.app.use(express.static(path.join(__dirname, '..', 'public')));
    this.app.use(cookieParser(process.env.COOKIE_SECRET));
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET as string,
        saveUninitialized: false,
        resave: false,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24,
        },
      })
    );
    this.app.use(connectFlash());
    this.app.engine(
      'hbs',
      engine({
        extname: 'hbs',
        helpers: {
          dateFormat,
          eq: HandlebarsUtil.eq,
          math: HandlebarsUtil.math,
          not: HandlebarsUtil.not,
        },
      })
    );
    const viewsPath = path.join(__dirname, '..', 'views');
    this.app.set('view engine', 'hbs');
    this.app.set('views', viewsPath);
  }

  settings() {
    new RouteManager(this.app);
    this.app.listen(this.port, () => {
      console.log(`App is running on port ::${this.port}`);
    });
  }
}

function main() {
  const app = new App();
}

if (require.main === module) {
  main();
}
