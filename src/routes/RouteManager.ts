import fs from 'fs';
import path from 'path';
import { Application } from 'express';

export default class RouteManager {
  constructor(private app: Application) {
    this.routes();
  }

  routes() {
    const files = fs.readdirSync(path.join(__dirname));
    for (const file of files) {
      const filename = file.split('.')[0];
      if (filename !== RouteManager.name) {
        this.app.use(require(`./${filename}`).default);
      }
    }
  }
}
