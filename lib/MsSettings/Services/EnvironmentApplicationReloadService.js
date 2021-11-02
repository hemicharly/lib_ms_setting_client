"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentApplicationReloadService = void 0;
const AxiosInstanceClient_1 = require("../Configure/AxiosInstanceClient");
const Logger_1 = require("../Utils/Logger");
const Cryptography_1 = require("../../Cryptography");
class EnvironmentApplicationReloadService {
    constructor(urlGetSettings) {
        this.urlGetSettings = urlGetSettings;
    }
    async invoke() {
        Logger_1.logger.info(`MsSettingClient get [URL_SETTINGS]: ${this.urlGetSettings}`);
        const { data } = await AxiosInstanceClient_1.AxiosInstanceClient.get(`${this.urlGetSettings}`);
        const response = data;
        if (!response || response.applicationUuid || !response.settingsGlobal || !response.settingsApplication) {
            throw new Error('MsSettings environment not exist');
        }
        Logger_1.logger.info('Started reload settings environment');
        await EnvironmentApplicationReloadService.reloadSettings(response.settingsGlobal, response.settingsApplication);
        await EnvironmentApplicationReloadService.reloadSecrets(response.secretsGlobal, response.secretsApplication, response.applicationUuid);
        Logger_1.logger.info('Finished reload settings environment');
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
        if (settings[key] && settings[key] !== '') {
            process.env[key] = settings[key];
        }
    }
    static async reloadSecrets(secretsGlobal, secretsApplication, applicationUuid) {
        if (secretsGlobal) {
            const secretsGlobalKeys = Object.keys(secretsGlobal);
            const secretKeyGlobal = String(process.env.SECRET_KEY_GLOBAL);
            for (const key of secretsGlobalKeys) {
                await EnvironmentApplicationReloadService.reloadSecretsProcessEnv(key, secretsGlobal, secretKeyGlobal);
            }
        }
        if (secretsApplication && applicationUuid) {
            const secretsApplicationKeys = Object.keys(secretsApplication);
            for (const key of secretsApplicationKeys) {
                await EnvironmentApplicationReloadService.reloadSecretsProcessEnv(key, secretsApplication, applicationUuid);
            }
        }
    }
    static async reloadSecretsProcessEnv(key, secrets, secretKey) {
        if (secrets[key] && secrets[key] !== '') {
            process.env[key] = await Cryptography_1.cryptoDecryptAES.decrypt(secrets[key], secretKey);
        }
    }
}
exports.EnvironmentApplicationReloadService = EnvironmentApplicationReloadService;
