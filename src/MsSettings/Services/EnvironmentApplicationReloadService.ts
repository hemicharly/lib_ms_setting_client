import {AxiosInstanceClient} from "../Configure/AxiosInstanceClient";
import {GetEnvironmentResponse} from "../Response/GetEnvironmentResponse";
import {logger} from '../Utils/Logger';
import {cryptoDecryptAES} from "../../Cryptography";


export class EnvironmentApplicationReloadService {
  constructor(private readonly urlGetSettings: string) {
  }

  public async invoke(): Promise<void> {
    logger.info(`MsSettingClient get [URL_SETTINGS]: ${this.urlGetSettings}`);

    const { data } = await AxiosInstanceClient.get(`${this.urlGetSettings}`);
    const response = <GetEnvironmentResponse>data;

    if (!response || response.applicationUuid || !response.settingsGlobal || !response.settingsApplication) {
      throw new Error('MsSettings environment not exist');
    }

    logger.info('Started reload settings environment');
    await EnvironmentApplicationReloadService.reloadSettings(response.settingsGlobal, response.settingsApplication);
    await EnvironmentApplicationReloadService.reloadSecrets(response.secretsGlobal, response.secretsApplication, response.applicationUuid);
    logger.info('Finished reload settings environment');
  }

  private static async reloadSettings(settingsGlobal: any, settingsApplication: any): Promise<void> {
    const settingsGlobalKeys = Object.keys(settingsGlobal);
    for (const key of settingsGlobalKeys) {
      await EnvironmentApplicationReloadService.reloadSettingsProcessEnv(key, settingsGlobal);
    }

    const settingsApplicationKeys = Object.keys(settingsApplication);
    for (const key of settingsApplicationKeys) {
      await EnvironmentApplicationReloadService.reloadSettingsProcessEnv(key, settingsApplication);
    }
  }

  private static async reloadSettingsProcessEnv(key: string, settings: any): Promise<void> {
    if (settings[key] && settings[key] !== '') {
      process.env[key] = settings[key];
    }
  }

  private static async reloadSecrets(secretsGlobal: any, secretsApplication: any, applicationUuid: string): Promise<void> {
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

  private static async reloadSecretsProcessEnv(key: string, secrets: any, secretKey: string): Promise<void> {
    if (secrets[key] && secrets[key] !== '') {
      process.env[key] = await cryptoDecryptAES.decrypt(secrets[key], secretKey);
    }
  }
}
