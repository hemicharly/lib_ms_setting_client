"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptoDecrypt = exports.loadSettings = void 0;
const index_1 = __importDefault(require("./MsSettings/index"));
const Cryptography_1 = require("./Cryptography");
async function loadSettings(config) {
    if (!config.secretKeyGlobal || config.secretKeyGlobal.length <= 0) {
        throw new Error('SecretKeyGlobal is required');
    }
    process.env['SECRET_KEY_GLOBAL'] = config.secretKeyGlobal;
    const msSettings = new index_1.default(config.urlSubscribe, config.urlGetSettings, config.applicationUuid, config.applicationName);
    await msSettings.reload();
}
exports.loadSettings = loadSettings;
exports.cryptoDecrypt = Cryptography_1.cryptoDecryptAES;
