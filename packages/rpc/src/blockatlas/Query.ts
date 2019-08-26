export class Query {
    rpcUrl: string;
    network: string;

    constructor(rpcUrl: string, network: string) {
        this.rpcUrl = rpcUrl;
        this.network = network;
    }

    listValidators = () => this.uri(`/staking/validators`);
    listTransactions = (address: string) => this.uri(`/transactions/${address}`);

    private uri(path: string): string {
        return `${this.rpcUrl}/v2/${this.network}${path}`;
    }
}
