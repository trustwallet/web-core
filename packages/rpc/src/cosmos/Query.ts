export class Query {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    listDelegations = (address: string) => this.uri(`staking/delegators/${address}/delegations`);
    getAccount = (address: string) => this.uri(`auth/accounts/${address}`);
    broadcastTransaction = () => this.uri('txs');

    private uri(path: string): string {
        return `${this.rpcUrl}/${path}`;
    }
}
