export class Query {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    getNodeInfo = () => this.uri(`v1/node-info`);
    getAccount = (address: string) => this.uri(`v1/account/${address}`);
    getMarket = (limit: number = 100, offset: number = 0) => this.uri(`v1/markets?limit=${limit}&offset=${offset}`);
    getOrder = (order: string, address: string, symbol: string) =>
        this.uri(`v1/orders/${order}?address=${address}&symbol=${symbol}`);
    getTransaction = (transactionHash: string) => this.uri(`v1/tx/${transactionHash}?format=json`);
    broadcastTransaction = (sync: string) => this.uri(`v1/broadcast?sync=${sync}`);

    private uri(path: string) {
        return `${this.rpcUrl}/${path}`;
    }
}
