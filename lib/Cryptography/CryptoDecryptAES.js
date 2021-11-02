"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoDecryptAES = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
class CryptoDecryptAES {
    async generatorSecretKey() {
        return crypto_js_1.default.lib.WordArray.random(16).toString(crypto_js_1.default.enc.Hex);
    }
    async encrypt(word, secretKey) {
        const iv = await CryptoDecryptAES.randomIv();
        const key = await CryptoDecryptAES.builderSecretKey(secretKey);
        const message = crypto_js_1.default.enc.Utf8.parse(word);
        const encrypted = crypto_js_1.default.AES.encrypt(message, key, {
            iv: crypto_js_1.default.enc.Base64.parse(iv),
            mode: crypto_js_1.default.mode.CBC,
            padding: crypto_js_1.default.pad.Pkcs7,
        });
        const ivHex = await CryptoDecryptAES.stringBase64ToStringHex(iv);
        const encryptedHex = await CryptoDecryptAES.stringBase64ToStringHex(encrypted.toString());
        return await CryptoDecryptAES.stringHexToStringBase64(ivHex + encryptedHex);
    }
    async decrypt(word, secretKey) {
        const msgHex = await CryptoDecryptAES.stringBase64ToStringHex(word);
        const ivB64 = await CryptoDecryptAES.stringHexToStringBase64(msgHex.substr(0, 32));
        const encryptedB64 = await CryptoDecryptAES.stringHexToStringBase64(msgHex.substr(32));
        const key = await CryptoDecryptAES.builderSecretKey(secretKey);
        const decrypted = crypto_js_1.default.AES.decrypt(encryptedB64, key, {
            iv: crypto_js_1.default.enc.Base64.parse(ivB64),
            mode: crypto_js_1.default.mode.CBC,
            padding: crypto_js_1.default.pad.Pkcs7,
        });
        return crypto_js_1.default.enc.Utf8.stringify(decrypted).toString();
    }
    static async builderSecretKey(secretKey) {
        return crypto_js_1.default.enc.Base64.parse(secretKey.replace(/[^a-zA-Z0-9]/g, ''));
    }
    static async randomIv() {
        return crypto_js_1.default.lib.WordArray.random(16).toString(crypto_js_1.default.enc.Base64);
    }
    static async stringBase64ToStringHex(message) {
        return Buffer.from(message, 'base64').toString('hex');
    }
    static async stringHexToStringBase64(message) {
        return Buffer.from(message, 'hex').toString('base64');
    }
}
exports.CryptoDecryptAES = CryptoDecryptAES;
