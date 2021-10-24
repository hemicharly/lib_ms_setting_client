"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reload = void 0;
const index_1 = __importDefault(require("./MsSettings/index"));
async function reload(config) {
    const msSettings = new index_1.default(config.urlSubscribe, config.urlGetSettings, config.applicationUuid, config.applicationName);
    await msSettings.reload();
}
exports.reload = reload;
