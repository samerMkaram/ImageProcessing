"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 5000;
app.get('/', () => {
    console.log('Server Started ');
});
app.listen(port, () => console.log('app started to listen on port ' + port));
console.log('welcome ✌');
