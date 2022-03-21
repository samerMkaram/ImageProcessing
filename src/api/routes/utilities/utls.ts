import fsPromises from 'fs';
import sharp from 'sharp';

async function ResizeImage(
  filename: string,
  width: number,
  heigh: number,
  outFilePath: string
): Promise<void> {
  try {
    await sharp(filename).resize(width, heigh).toFile(outFilePath);
  } catch (error) {
    //console.log(error);
  }
}

//check if image exists in cache directory
function ImageExists(outFilePath: string): boolean {
  if (fsPromises.existsSync(outFilePath)) {
    return true;
  } else return false;
}

//get file extention

function GetExt(dirName: string, imgName: string): string | undefined {
  try {
    const files = fsPromises.readdirSync(dirName, { withFileTypes: true });
    for (const file of files) {
      if (file.name.includes(imgName)) {
        return file.name.substring(file.name.indexOf('.'));
      }
    }
    return '.jpg';
  } catch (e) {
    console.error(e);
  }
}

export default {
  GetExt,
  ImageExists,
  ResizeImage
};
