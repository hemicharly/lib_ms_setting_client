"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventSourceClient_1 = require("./Configure/EventSourceClient");
const EnvironmentApplicationReloadService_1 = require("./Services/EnvironmentApplicationReloadService");
class MsSettings {
    constructor(urlSubscribe, urlGetSettings, applicationUuid, applicationName) {
        this.urlSubscribe = urlSubscribe;
        this.urlGetSettings = urlGetSettings;
        this.applicationUuid = applicationUuid;
        this.applicationName = applicationName;
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
        this.service = new EnvironmentApplicationReloadService_1.EnvironmentApplicationReloadService(urlGetSettings, this.applicationUuid);
        /*REGISTER: EventSource client*/
        new EventSourceClient_1.EventSourceClient(urlSubscribe, applicationUuid, applicationName, this.service);
    }
    async reload() {
        await this.service.invoke();
    }
}
exports.default = MsSettings;
