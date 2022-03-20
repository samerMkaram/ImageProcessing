"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./api/index"));
//create server
const app = (0, express_1.default)();
//set por number
const port = 3000;
app.get('/', (_req, res) => {
    res.send('Please move to /api/resize 👉');
});
//route for resize function
app.use('/api', index_1.default);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
app.use((req, res) => {
    res.send('you looks lost ✋');
});
exports.default = app;
