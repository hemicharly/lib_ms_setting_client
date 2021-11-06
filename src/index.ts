import MsSettings from "./MsSettings/index";
import {ConfigMsSettingClient} from "./MsSettings/Dto/ConfigMsSettingClient";
import {cryptoDecryptAES} from "./Cryptography";


export async function loadSettings(config: ConfigMsSettingClient) {
    if (!config.secretKeyGlobal || config.secretKeyGlobal.length <= 0) {
        throw new Error('SecretKeyGlobal is required');
    }
    process.env['SECRET_KEY_GLOBAL'] = config.secretKeyGlobal;
    const msSettings = new MsSettings(config.urlSubscribe, config.urlGetSettings, config.applicationUuid, config.applicationName);
    await msSettings.reload();
}

export const cryptoDecrypt = cryptoDecryptAES;
