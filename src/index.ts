import MsSettings from "./MsSettings/index";
import {ConfigMsSettingClient} from "./MsSettings/Dto/ConfigMsSettingClient";
import {cryptoDecryptAES} from "./Cryptography";


export const cryptoDecrypt = cryptoDecryptAES;

export async function loadSettings(config: ConfigMsSettingClient) {
    const msSettings = new MsSettings(config.urlSubscribe, config.urlGetSettings, config.applicationUuid, config.applicationName);
    await msSettings.reload();
}
