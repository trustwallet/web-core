export class Query {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    // listDelegations = (address: string) => this.uri(`staking/delegators/${address}/delegations`);
    // account = (address: string) => this.uri(`auth/accounts/${address}`);
    head = () => this.uri('chains/main/blocks/head');
    account = (address: string) => this.uri(`chains/main/blocks/head/context/contracts/${address}`);
    manageKey = (address: string) => this.uri(`chains/main/blocks/head/context/contracts/${address}/manager_key`);
    ktAddress = (tzaddress: string) => `https://rpc.tezrpc.me/chains/main/blocks/head/context/contracts/${tzaddress}/manager_key`;
    blockOperations = (block: string) => this.uri(`chains/main/blocks/${block}/operations`);
    broadcast = () => this.uri('injection/operation?chain=main');

    private uri(path: string): string {
        return `${this.rpcUrl}/${path}`;
    }
}
