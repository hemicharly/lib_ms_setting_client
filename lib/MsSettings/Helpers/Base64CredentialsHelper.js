"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Base64CredentialsHelper {
    static builderUserCredentials(applicationUuid) {
        const buffer = Buffer.from('app:' + applicationUuid);
        return 'Basic ' + buffer.toString('base64');
    }
}
exports.default = Base64CredentialsHelper;
