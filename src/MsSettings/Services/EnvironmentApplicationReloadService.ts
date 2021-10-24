import {AxiosInstanceClient} from "../Configure/AxiosInstanceClient";
import {GetEnvironmentResponse} from "../Response/GetEnvironmentResponse";

export class EnvironmentApplicationReloadService {
  constructor(private readonly urlGetSettings: string) {
  }

  public async invoke(): Promise<void> {
    const { data } = await AxiosInstanceClient.get(`${this.urlGetSettings}`);
    const response = <GetEnvironmentResponse>data;

    if (!response || !response.settingsGlobal || !response.settingsApplication) {
      throw new Error('MsSettings environment not exist');
    }

    await EnvironmentApplicationReloadService.reloadSettings(response.settingsGlobal, response.settingsApplication);
    await EnvironmentApplicationReloadService.reloadSecrets(response.secretsGlobal, response.secretsApplication);
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
    if (process.env[key] && settings[key] && settings[key] !== '') {
      process.env[key] = settings[key];
    }
  }

  private static async reloadSecrets(secretsGlobal: any, secretsApplication: any): Promise<void> {
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

  private static async reloadSecretsProcessEnv(key: string, secrets: any): Promise<void> {
    if (process.env[key] && secrets[key] && secrets[key] !== '') {
      process.env[key] = secrets[key];
    }
  }
}
