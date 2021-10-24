interface ConfigMsSettingClient {
    urlSubscribe: string;
    urlGetSettings: string;
    applicationUuid: string;
    applicationName: string;
}
export declare function reload(config: ConfigMsSettingClient): Promise<void>;
export {};
