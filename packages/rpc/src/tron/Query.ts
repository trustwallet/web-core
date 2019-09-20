export class Query {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    getNowBlock = () => this.uri('/wallet/getnowblock');

    getAccount = () => this.uri('/wallet/getaccount');

    broadcastTransaction = () => this.uri('/wallet/broadcasttransaction');

    getTransactionById = () => this.uri('/wallet/gettransactionbyid');

    triggerSmartContract = () => this.uri('/wallet/triggersmartcontract');

    freezeBalance = () => this.uri('/wallet/freezebalance');

    unfreezeBalance = () => this.uri('/wallet/unfreezebalance');

    private uri(path: string): string {
        return `${this.rpcUrl}/${path}`;
    }
}
