export declare class CryptoDecryptAES {
    generatorSecretKey(): Promise<string>;
    encrypt(word: string, secretKey: string): Promise<string>;
    decrypt(word: string, secretKey: string): Promise<string>;
    private static builderSecretKey;
    private static randomIv;
    private static stringBase64ToStringHex;
    private static stringHexToStringBase64;
}
