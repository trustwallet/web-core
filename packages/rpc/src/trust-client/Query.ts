export class Query {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    getPrices = () => this.uri(`prices`);

    private uri(path: string): string {
        return `${this.rpcUrl}/${path}`;
    }
}
