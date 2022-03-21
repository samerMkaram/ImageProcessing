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
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
function ResizeImage(filename, width, heigh, outFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, sharp_1.default)(filename).resize(width, heigh).toFile(outFilePath);
        }
        catch (error) {
            //console.log(error);
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
//get file extention
function GetExt(dirName, imgName) {
    try {
        const files = fs_1.default.readdirSync(dirName, { withFileTypes: true });
        for (const file of files) {
            if (file.name.includes(imgName)) {
                return file.name.substring(file.name.indexOf('.'));
            }
        }
        return '.jpg';
    }
    catch (e) {
        console.error(e);
    }
}
exports.default = {
    GetExt,
    ImageExists,
    ResizeImage
};
