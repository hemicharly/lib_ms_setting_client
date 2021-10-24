"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentApplicationReloadService = void 0;
const AxiosInstanceClient_1 = require("../Configure/AxiosInstanceClient");
class EnvironmentApplicationReloadService {
    constructor(urlGetSettings) {
        this.urlGetSettings = urlGetSettings;
    }
    async invoke() {
        const { data } = await AxiosInstanceClient_1.AxiosInstanceClient.get(`${this.urlGetSettings}`);
        const response = data;
        if (!response || !response.settingsGlobal || !response.settingsApplication) {
            throw new Error('MsSettings environment not exist');
        }
        await EnvironmentApplicationReloadService.reloadSettings(response.settingsGlobal, response.settingsApplication);
        await EnvironmentApplicationReloadService.reloadSecrets(response.secretsGlobal, response.secretsApplication);
    }
    static async reloadSettings(settingsGlobal, settingsApplication) {
        const settingsGlobalKeys = Object.keys(settingsGlobal);
        for (const key of settingsGlobalKeys) {
            await EnvironmentApplicationReloadService.reloadSettingsProcessEnv(key, settingsGlobal);
        }
        const settingsApplicationKeys = Object.keys(settingsApplication);
        for (const key of settingsApplicationKeys) {
            await EnvironmentApplicationReloadService.reloadSettingsProcessEnv(key, settingsApplication);
        }
    }
    static async reloadSettingsProcessEnv(key, settings) {
        if (process.env[key] && settings[key] && settings[key] !== '') {
            process.env[key] = settings[key];
        }
    }
    static async reloadSecrets(secretsGlobal, secretsApplication) {
        if (secretsGlobal) {
            const secretsGlobalKeys = Object.keys(secretsGlobal);
            for (const key of secretsGlobalKeys) {
                await EnvironmentApplicationReloadService.reloadSecretsProcessEnv(key, secretsGlobal);
            }
        }
        if (secretsApplication) {
            const secretsApplicationKeys = Object.keys(secretsApplication);
            for (const key of secretsApplicationKeys) {
                await EnvironmentApplicationReloadService.reloadSecretsProcessEnv(key, secretsApplication);
            }
        }
    }
    static async reloadSecretsProcessEnv(key, secrets) {
        if (process.env[key] && secrets[key] && secrets[key] !== '') {
            process.env[key] = secrets[key];
        }
    }
}
exports.EnvironmentApplicationReloadService = EnvironmentApplicationReloadService;
