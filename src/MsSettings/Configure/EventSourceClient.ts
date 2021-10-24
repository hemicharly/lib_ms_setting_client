import EventSource from 'eventsource';
import { EnvironmentApplicationReloadService } from '../Services/EnvironmentApplicationReloadService';

export class EventSourceClient {

  constructor(private readonly urlSubscribe: string, private readonly applicationUuid: string,  private readonly applicationName: string, private readonly service: EnvironmentApplicationReloadService) {
    const client = new EventSource(`${this.urlSubscribe}`);

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
        console.error(error);
      }
    };

    client.onerror = (error: MessageEvent) => {
      console.error(error);
    };
  }
}
