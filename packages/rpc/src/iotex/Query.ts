export class Query {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    getAccount = (account: string) => this.uri(`v1/accounts/${account}`);
    getTransaction = (hash: string) => this.uri(`v1/actions/hash/${hash}`);
    broadcastTransaction = (data: string) => this.uri(`v1/actionbytes/${data}`);

    private uri(path: string): string {
        return `${this.rpcUrl}/${path}`;
    }
}
