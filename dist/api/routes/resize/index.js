"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const Resize = express_1.default.Router();
Resize.get('/', (req, res) => {
    //reading API request parameters
    const imageName = req.query.filename;
    const width = req.query.width * 1;
    const heigh = req.query.heigh * 1;
    const outFileName = imageName + '_' + width + '_' + heigh; //final file name to be saved in cache
    const inFileName = path_1.default.resolve(__dirname, '..') + '\\resize\\assets\\' + imageName + '.jpg';
    if (!fs_1.default.existsSync(path_1.default.resolve(__dirname, '..') + '\\resize\\cashed\\')) {
        //create cache directory if not exists
        const newPath = path_1.default.resolve(__dirname, '..') + '\\resize\\cashed';
        fs_1.default.mkdir(newPath, () => {
            console.log('New cashed directory created');
        });
    }
    //final file path to be saved
    const outFilePath = path_1.default.resolve(__dirname, '..') + '\\resize\\cashed\\' + outFileName + '.jpg';
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
function ResizeImage(filename, width, heigh, outFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        //const sharp = require('sharp')
        try {
            yield (0, sharp_1.default)(filename).resize(width, heigh).toFile(outFilePath);
        }
        catch (error) {
            console.log('Error occured');
            console.error(error);
        }
    });
}
//check if image exists in cache directory
function ImageExists(outFilePath) {
    if (fs_1.default.existsSync(outFilePath)) {
        return true;
    }
    else
        return false;
}
exports.default = Resize;
