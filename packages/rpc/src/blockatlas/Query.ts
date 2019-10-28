export class Query {
    rpcUrl: string;
    network: string | null;

    constructor(rpcUrl: string, network: string | null = null) {
        this.rpcUrl = rpcUrl;
        this.network = network;
    }

    listValidators = () => this.uri(`staking/validators`);
    listDelegations = (address: string) => this.uri(`staking/delegations/${address}`);
    listDelegationsBatch = () => this.uri(`staking/delegations`);
    listTransactions = (address: string) => this.uri(`transactions/${address}`);

    private uri(path: string): string {
        if (this.network)
            return `${this.rpcUrl}/v2/${this.network}/${path}`;
        return `${this.rpcUrl}/v2/${path}`;
    }
}
