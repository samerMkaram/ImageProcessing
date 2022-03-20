"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const utls_1 = __importDefault(require("../utilities/utls"));
const Resize = express_1.default.Router();
Resize.get('/', (req, res) => {
    //reading API request parameters
    const imageName = req.query.filename;
    const width = req.query.width * 1;
    const heigh = req.query.heigh * 1;
    const outFileName = imageName + '_' + width + '_' + heigh; //final file name to be saved in cache
    //Get File extention
    const ext = utls_1.default.GetExt(path_1.default.resolve(__dirname, '..', 'resize', 'assets'), imageName);
    //prepare original file name
    const inFileName = path_1.default.resolve(__dirname, '..', 'resize', 'assets', imageName) + ext;
    //check if desitnation directory exists or not
    if (!fs_1.default.existsSync(path_1.default.resolve(__dirname, '..', 'resize', 'cached'))) {
        const newPath = path_1.default.resolve(__dirname, '..', 'resize', 'cached');
        fs_1.default.mkdir(newPath, () => {
            console.log('New cashed directory created');
        });
    }
    //prepare final file path to be saved
    const outFilePath = path_1.default.resolve(__dirname, '..', 'resize', 'cached', outFileName) + ext;
    //check if file cached before
    if (utls_1.default.ImageExists(outFilePath)) {
        //return old cached image
        res.sendFile(outFilePath);
    }
    //if not cached call ResizeImage async function
    else {
        utls_1.default
            .ResizeImage(inFileName, width, heigh, outFilePath)
            //return new cached image
            .then(() => {
            res.sendFile(outFilePath);
        })
            .catch((reject) => console.error(reject.message));
    }
});
exports.default = Resize;
