"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSourceClient = void 0;
const eventsource_1 = __importDefault(require("eventsource"));
class EventSourceClient {
    constructor(urlSubscribe, applicationUuid, applicationName, service) {
        this.urlSubscribe = urlSubscribe;
        this.applicationUuid = applicationUuid;
        this.applicationName = applicationName;
        this.service = service;
        const client = new eventsource_1.default(`${this.urlSubscribe}`);
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
                console.error(error);
            }
        };
        client.onerror = (error) => {
            console.error(error);
        };
    }
}
exports.EventSourceClient = EventSourceClient;
