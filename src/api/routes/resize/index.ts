import express, { Request, Response } from 'express';
import path from 'path';
import fsPromises from 'fs';
import sharp from 'sharp';
const Resize = express.Router();

Resize.get('/', (req: Request, res: Response) => {
  //reading API request parameters
  const imageName = req.query.filename;
  const width = (req.query.width as unknown as number) * 1;
  const heigh = (req.query.heigh as unknown as number) * 1;
  const outFileName = imageName + '_' + width + '_' + heigh; //final file name to be saved in cache
  const inFileName = path.resolve(__dirname, '..') + '\\resize\\assets\\' + imageName + '.jpg';
  if (!fsPromises.existsSync(path.resolve(__dirname, '..') + '\\resize\\cashed\\')) {
    //create cache directory if not exists
    const newPath = path.resolve(__dirname, '..') + '\\resize\\cashed';
    fsPromises.mkdir(newPath, () => {
      console.log('New cashed directory created');
    });
  }
  //final file path to be saved
  const outFilePath = path.resolve(__dirname, '..') + '\\resize\\cashed\\' + outFileName + '.jpg';
  //check if file cached before
  if (ImageExists(outFilePath)) {
    //return old cached image
    res.sendFile(outFilePath);
  }
  //if not cached call ResizeImage async function
  else {
    ResizeImage(inFileName, width, heigh, outFilePath)
      //return new cached image
      .then(() => {
        res.sendFile(outFilePath);
      })
      .catch((reject) => console.error(reject.message));
  }
});

//resize image to given heigh and width ,and save to a given path using Sharp
async function ResizeImage(filename: string, width: number, heigh: number, outFilePath: string) {
  //const sharp = require('sharp')
  try {
    await sharp(filename).resize(width, heigh).toFile(outFilePath);
  } catch (error) {
    console.log('Error occured');
    console.error(error);
  }
}

//check if image exists in cache directory
function ImageExists(outFilePath: string): boolean {
  if (fsPromises.existsSync(outFilePath)) {
    return true;
  } else return false;
}

export default Resize;
