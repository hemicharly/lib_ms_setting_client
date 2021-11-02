export declare class EnvironmentApplicationReloadService {
    private readonly urlGetSettings;
    constructor(urlGetSettings: string);
    invoke(): Promise<void>;
    private static reloadSettings;
    private static reloadSettingsProcessEnv;
    private static reloadSecrets;
    private static reloadSecretsProcessEnv;
}
