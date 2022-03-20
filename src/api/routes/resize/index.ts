import express, { Request, Response } from 'express';
import path from 'path';
import fsPromises from 'fs';
import utls from '../utilities/utls';

const Resize = express.Router();

Resize.get('/', (req: Request, res: Response) => {


  //reading API request parameters
  const imageName = req.query.filename;
  const width = (req.query.width as unknown as number) * 1;
  const heigh = (req.query.heigh as unknown as number) * 1;
  const outFileName = imageName + '_' + width + '_' + heigh; //final file name to be saved in cache

  //Get File extention
  const ext = utls.GetExt(path.resolve(__dirname, '..','resize','assets' ),(imageName as string) );

  //prepare original file name
  const inFileName = path.resolve(__dirname, '..', 'resize','assets',imageName as string)+ ext;

  //check if desitnation directory exists or not
  if (!fsPromises.existsSync(path.resolve(__dirname, '..' ,'resize','cached'))) {
    const newPath = path.resolve(__dirname, '..' , 'resize','cached');
    fsPromises.mkdir(newPath, () => {
      console.log('New cashed directory created');
    });
  }


  //prepare final file path to be saved
  const outFilePath = path.resolve(__dirname, '..','resize','cached', outFileName)+ext ;

  //check if file cached before
  if (utls.ImageExists(outFilePath)) {
    //return old cached image
    res.sendFile(outFilePath);
  }

  //if not cached call ResizeImage async function
  else {
    utls
      .ResizeImage(inFileName, width, heigh, outFilePath)
      //return new cached image
      .then(() => {
        res.sendFile(outFilePath);
      })
      .catch((reject) => console.error(reject.message));
  }
});

export default Resize;
