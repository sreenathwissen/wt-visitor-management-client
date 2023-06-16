export class AppUrlConstants {

    static baseUrl: string = 'http://localhost:8080';
    static refDataUrl: string = this.baseUrl.concat('/api/refdata');
    static visitorSave: string = this.baseUrl.concat('/api/visitor');
    static visitorFetch: string = this.baseUrl.concat('/api/visitor/genericFetch');

}