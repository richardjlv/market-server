import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import Youch from 'youch';

import 'express-async-errors';

import { router } from './routes';

class App {
  server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.disable('x-powered-by');
  }

  routes() {
    this.server.use('/', router);
  }

  exceptionHandler() {
    this.server.use(async (err: any, req: Request, res: Response) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

const app = new App().server;

export { app };
