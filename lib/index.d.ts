import { ConfigMsSettingClient } from "./MsSettings/Dto/ConfigMsSettingClient";
export declare const cryptoDecrypt: import("./Cryptography/CryptoDecryptAES").CryptoDecryptAES;
export declare function loadSettings(config: ConfigMsSettingClient): Promise<void>;
