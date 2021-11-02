"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosInstanceClient = void 0;
const axios_1 = __importDefault(require("axios"));
exports.AxiosInstanceClient = axios_1.default.create({
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});
