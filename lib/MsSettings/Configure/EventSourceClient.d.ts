import { EnvironmentApplicationReloadService } from '../Services/EnvironmentApplicationReloadService';
export declare class EventSourceClient {
    private readonly urlSubscribe;
    private readonly applicationUuid;
    private readonly applicationName;
    private readonly service;
    constructor(urlSubscribe: string, applicationUuid: string, applicationName: string, service: EnvironmentApplicationReloadService);
}
