export class Query {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    getNowBlock = () => this.uri("/wallet/getnowblock");

    getAccount = () => this.uri("/wallet/getaccount");

    broadcastTransaction = () => this.uri("/wallet/broadcasttransaction");

    getTransactionById = () => this.uri("/wallet/gettransactionbyid");

    triggerSmartContract = () => this.uri("/wallet/triggersmartcontract");

    private uri(path: string) {
        return `${this.rpcUrl}/${path}`;
    }
}
