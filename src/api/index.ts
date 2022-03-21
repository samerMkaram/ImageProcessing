import express, { Request, Response, NextFunction } from 'express';
import Resize from './routes/resize';
import fsPromises from 'fs';
import path from 'path';
import utls from './routes/utilities/utls';

const route = express.Router();

void route.get('/', (req: Request, res: Response) => {
  res.send('Main Route , Please move to /resize');
});

void route.use(
  '/resize',
  (req: Request, res: Response, next: NextFunction) => {
    const width = req.query.width as unknown as number;
    //validate width input
    if (width <= 0 || width === undefined || isNaN(width)) {
      res.send('Please enter valid width');
    } else {
      next();
    }
  },
  (req: Request, res: Response, next: NextFunction) => {
    const heigh = req.query.heigh as unknown as number;
    //validate heigh input
    if (heigh <= 0 || heigh === undefined || isNaN(heigh)) {
      res.send('Please enter valid heigh');
    } else {
      next();
    }
  },
  (req: Request, res: Response, next: NextFunction) => {
    const fileName = req.query.filename;
    const ext = utls.GetExt(
      path.resolve(__dirname, '..', 'api', 'routes', 'resize', 'assets'),
      fileName as string
    );
    const inFileName =
      path.resolve(__dirname, '..', 'api', 'routes', 'resize', 'assets', fileName as string) + ext;
    //validate filename is exists in assets folder
    if (!fsPromises.existsSync(inFileName)) {
      res.send('Invalid filename');
    } else {
      next();
    }
  },
  Resize
);

export default route;
