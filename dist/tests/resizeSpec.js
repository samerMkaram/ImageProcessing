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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const utls_1 = __importDefault(require("../api/routes/utilities/utls"));
const path_1 = __importDefault(require("path"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint response', () => {
    it('Get /api response', () => {
        request.get('/api').then((res) => {
            expect(res.status).toBe(200);
        });
    });
});
describe('Test endpoint image resize process', () => {
    it('Success resize', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/resize?filename=fjord&width=233&heigh=432').then((res) => {
            expect(res.status).toBe(200);
        });
    }));
    it('Missing or invalid width parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/resize?filename=fjord&width=&heigh=432').then((res) => {
            expect(res.text).toBe('Please enter valid width');
        });
    }));
    it('Missing or invalid heigh parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/resize?filename=fjord&width=200&heigh=').then((res) => {
            expect(res.text).toBe('Please enter valid heigh');
        });
    }));
    it('Missing or invalid filename parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/resize?filename=&width=200&heigh=200').then((res) => {
            expect(res.text).toBe('Invalid filename');
        });
    }));
});
describe('Test Sharp resize function', () => {
    it('Success ResizeImage', () => __awaiter(void 0, void 0, void 0, function* () {
        const inFileName = path_1.default.resolve('.', 'src', 'api', 'routes', 'resize', 'assets', 'fjord.jpg');
        const outFilePath = path_1.default.resolve('.', 'src', 'api', 'routes', 'resize', 'cache');
        expect(yield utls_1.default.ResizeImage(inFileName, 500, 500, outFilePath)).toBeTruthy;
    }));
    it('Resize function not threw in case of invalid input', () => {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            const inFileName = '';
            const outFilePath = '';
            yield utls_1.default.ResizeImage(inFileName, -2, 500, outFilePath);
        })).not.toThrow();
    });
});
