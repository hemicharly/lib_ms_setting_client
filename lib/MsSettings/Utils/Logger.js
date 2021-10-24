"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerError = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const loggerFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), winston_1.default.format.json(), winston_1.default.format.printf((info) => {
    return JSON.stringify({
        datetime: info.timestamp,
        level: info.level.toUpperCase(),
        message: info.message,
    });
}));
exports.logger = winston_1.default.createLogger({
    format: loggerFormat,
    transports: [new winston_1.default.transports.Console()]
});
const loggerError = (e) => {
    exports.logger.error(JSON.stringify({
        error: e,
        stack: e.stack || null,
    }));
};
exports.loggerError = loggerError;
