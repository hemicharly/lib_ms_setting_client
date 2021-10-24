import MsSettings from "./MsSettings/index";

interface ConfigMsSettingClient {
    urlSubscribe: string;
    urlGetSettings: string;
    applicationUuid: string;
    applicationName: string;
}

export async function reload(config: ConfigMsSettingClient){
    const msSettings = new MsSettings(config.urlSubscribe, config.urlGetSettings, config.applicationUuid, config.applicationName);
    await msSettings.reload();
}
