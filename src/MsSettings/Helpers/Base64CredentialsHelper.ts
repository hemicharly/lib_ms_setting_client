export default class Base64CredentialsHelper {
    public static builderUserCredentials(applicationUuid: string): string {
        const buffer = Buffer.from('app:' + applicationUuid);
        return 'Basic ' + buffer.toString('base64');
    }
}
