export class Query {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    getPrices = () => this.uri(`prices`);

    private uri(path: string): string {
        return `${this.url}/${path}`;
    }
}
