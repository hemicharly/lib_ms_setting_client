"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSourceClient = void 0;
const eventsource_1 = __importDefault(require("eventsource"));
const Logger_1 = require("../Utils/Logger");
const Base64CredentialsHelper_1 = __importDefault(require("../Helpers/Base64CredentialsHelper"));
class EventSourceClient {
    constructor(urlSubscribe, applicationUuid, applicationName, service) {
        this.urlSubscribe = urlSubscribe;
        this.applicationUuid = applicationUuid;
        this.applicationName = applicationName;
        this.service = service;
        const authorization = Base64CredentialsHelper_1.default.builderUserCredentials(applicationUuid);
        const client = new eventsource_1.default(`${this.urlSubscribe}?authorization=${authorization}`);
        Logger_1.logger.info(`MsSettingClient subscribe [APPLICATION_UUID]: ${applicationUuid} [APPLICATION_NAME]: ${applicationName}`);
        client.onmessage = async (message) => {
            try {
                let data = null;
                if (message && message.data && message.data.length > 0) {
                    data = JSON.parse(message.data);
                }
                if (data && data.applicationUuid && data.applicationUuid === this.applicationUuid) {
                    await this.service.invoke();
                }
            }
            catch (error) {
                (0, Logger_1.loggerError)(error);
            }
        };
        client.onerror = (error) => {
            (0, Logger_1.loggerError)(error);
        };
    }
}
exports.EventSourceClient = EventSourceClient;
