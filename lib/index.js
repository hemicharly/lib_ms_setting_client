"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSettings = exports.cryptoDecrypt = void 0;
const index_1 = __importDefault(require("./MsSettings/index"));
const Cryptography_1 = require("./Cryptography");
exports.cryptoDecrypt = Cryptography_1.cryptoDecryptAES;
async function loadSettings(config) {
    const msSettings = new index_1.default(config.urlSubscribe, config.urlGetSettings, config.applicationUuid, config.applicationName);
    await msSettings.reload();
}
exports.loadSettings = loadSettings;
