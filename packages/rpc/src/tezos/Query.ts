export class Query {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    getAccount = (contactId: string) => this.uri(`chains/main/blocks/head/context/contracts/${contactId}`);

    getHead = () => this.uri(`chains/main/blocks/head`);

    getBlockOperations = (block: string) => this.uri(`chains/main/blocks/${block}/operations`);

    broadcastTransaction = () => this.uri(`injection/operation?chain=main`);

    getManagerKey = (contractId: string) =>
        this.uri(`chains/main/blocks/head/context/contracts/${contractId}/manager_key`);

    private uri(path: string) {
        return `${this.rpcUrl}/${path}`;
    }
}
