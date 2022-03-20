"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resize_1 = __importDefault(require("./routes/resize"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utls_1 = __importDefault(require("./routes/utilities/utls"));
const route = express_1.default.Router();
route.get('/', (req, res) => {
    res.send('Main Route , Please move to /resize');
});
route.use('/resize', (req, res, next) => {
    const width = req.query.width;
    //validate width input
    if (width <= 0 || width === undefined || isNaN(width)) {
        res.send('Please enter valid width');
    }
    else {
        next();
    }
}, (req, res, next) => {
    const heigh = req.query.heigh;
    //validate heigh input
    if (heigh <= 0 || heigh === undefined || isNaN(heigh)) {
        res.send('Please enter valid heigh');
    }
    else {
        next();
    }
}, (req, res, next) => {
    const fileName = req.query.filename;
    const ext = utls_1.default.GetExt(path_1.default.resolve(__dirname, '..') + '\\api\\routes\\resize\\assets\\', fileName);
    const inFileName = path_1.default.resolve(__dirname, '..') + '\\api\\routes\\resize\\assets\\' + fileName + ext;
    //validate filename is exists in assets folder
    if (!fs_1.default.existsSync(inFileName)) {
        res.send('Invalid filename');
    }
    else {
        next();
    }
}, resize_1.default);
exports.default = route;
