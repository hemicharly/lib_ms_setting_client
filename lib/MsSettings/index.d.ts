import { EnvironmentApplicationReloadService } from './Services/EnvironmentApplicationReloadService';
export default class MsSettings {
    private readonly urlSubscribe;
    private readonly urlGetSettings;
    private readonly applicationUuid;
    private readonly applicationName;
    protected service: EnvironmentApplicationReloadService;
    constructor(urlSubscribe: string, urlGetSettings: string, applicationUuid: string, applicationName: string);
    reload(): Promise<void>;
}
