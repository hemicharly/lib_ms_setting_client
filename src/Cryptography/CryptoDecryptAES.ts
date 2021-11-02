import CryptoJS from 'crypto-js';

export class CryptoDecryptAES {
  public async generatorSecretKey(): Promise<string> {
    return CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
  }

  public async encrypt(word: string, secretKey: string): Promise<string> {
    const iv = await CryptoDecryptAES.randomIv();
    const key = await CryptoDecryptAES.builderSecretKey(secretKey);
    const message = CryptoJS.enc.Utf8.parse(word);
    const encrypted = CryptoJS.AES.encrypt(message, key, {
      iv: CryptoJS.enc.Base64.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const ivHex = await CryptoDecryptAES.stringBase64ToStringHex(iv);
    const encryptedHex = await CryptoDecryptAES.stringBase64ToStringHex(encrypted.toString());
    return await CryptoDecryptAES.stringHexToStringBase64(ivHex + encryptedHex);
  }

  public async decrypt(word: string, secretKey: string): Promise<string> {
    const msgHex = await CryptoDecryptAES.stringBase64ToStringHex(word);
    const ivB64 = await CryptoDecryptAES.stringHexToStringBase64(msgHex.substr(0, 32));
    const encryptedB64 = await CryptoDecryptAES.stringHexToStringBase64(msgHex.substr(32));
    const key = await CryptoDecryptAES.builderSecretKey(secretKey);
    const decrypted = CryptoJS.AES.decrypt(encryptedB64, key, {
      iv: CryptoJS.enc.Base64.parse(ivB64),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Utf8.stringify(decrypted).toString();
  }

  private static async builderSecretKey(secretKey: string): Promise<CryptoJS.lib.WordArray> {
    return CryptoJS.enc.Base64.parse(secretKey);
  }

  private static async randomIv(): Promise<string> {
    return CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Base64);
  }

  private static async stringBase64ToStringHex(message: string): Promise<string> {
    return Buffer.from(message, 'base64').toString('hex');
  }

  private static async stringHexToStringBase64(message: string): Promise<string> {
    return Buffer.from(message, 'hex').toString('base64');
  }
}
