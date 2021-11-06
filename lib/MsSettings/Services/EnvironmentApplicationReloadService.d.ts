export declare class EnvironmentApplicationReloadService {
    private readonly urlGetSettings;
    private readonly applicationUuid;
    constructor(urlGetSettings: string, applicationUuid: string);
    invoke(): Promise<void>;
    private static reloadSettings;
    private static reloadSettingsProcessEnv;
    private static reloadSecrets;
    private static reloadSecretsProcessEnv;
}
