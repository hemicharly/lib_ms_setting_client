import EventSource from 'eventsource';
import { EnvironmentApplicationReloadService } from '../Services/EnvironmentApplicationReloadService';
import {logger, loggerError} from '../Utils/Logger';
import Base64CredentialsHelper from "../Helpers/Base64CredentialsHelper";

export class EventSourceClient {

  constructor(private readonly urlSubscribe: string, private readonly applicationUuid: string,  private readonly applicationName: string, private readonly service: EnvironmentApplicationReloadService) {
    const authorization = Base64CredentialsHelper.builderUserCredentials(applicationUuid);
    const client = new EventSource(`${this.urlSubscribe}?authorization=${authorization}`);
    logger.info(`MsSettingClient subscribe [APPLICATION_UUID]: ${applicationUuid} [APPLICATION_NAME]: ${applicationName}`);

    client.onmessage = async (message:MessageEvent) => {
      try {
        let data = null;
        if (message && message.data && message.data.length > 0) {
          data = JSON.parse(message.data);
        }
        if (data && data.applicationUuid && data.applicationUuid === this.applicationUuid) {
          await this.service.invoke();
        }
      } catch (error) {
        loggerError(error);
      }
    };

    client.onerror = (error: MessageEvent) => {
      loggerError(error);
    };
  }
}
