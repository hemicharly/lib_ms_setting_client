import {EventSourceClient} from './Configure/EventSourceClient';
import {EnvironmentApplicationReloadService} from './Services/EnvironmentApplicationReloadService';

export default class MsSettings {
    protected service: EnvironmentApplicationReloadService;

    constructor(private readonly urlSubscribe: string, private readonly urlGetSettings: string, private readonly applicationUuid: string, private readonly applicationName: string) {
        if (!urlSubscribe || urlSubscribe.length <= 0) {
            throw new Error('UrlSubscribe is required');
        }
        if (!urlGetSettings || urlGetSettings.length <= 0) {
            throw new Error('UrlGetSettings is required');
        }
        if (!applicationUuid || applicationUuid.length <= 0) {
            throw new Error('ApplicationUuid is required');
        }

        if (!applicationName || applicationName.length <= 0) {
            throw new Error('ApplicationName is required');
        }

        /*SERVICE: Environment application reload*/
        this.service = new EnvironmentApplicationReloadService(urlGetSettings, this.applicationUuid);

        /*REGISTER: EventSource client*/
        new EventSourceClient(urlSubscribe, applicationUuid, applicationName, this.service);
    }

    public async reload(): Promise<void> {
        await this.service.invoke();
    }
}
