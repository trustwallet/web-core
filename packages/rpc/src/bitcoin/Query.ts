import { BitcoinFeePriority } from './models/BitcoinFeePriority';

export class Query {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    getLatestBlock = () => this.uri(`/`);
    getBalance = (xpub: string) => this.uri(`/xpub/${xpub}?tokens=used`);
    listUnspent = (xpub: string) => this.uri(`/utxo/${xpub}`);
    listTransactions = (address: string) => this.uri(`/address/${address}`);
    getTransactionDetail = (hash: string) => this.uri(`/tx/${hash}`);
    estimateFee = (priority: BitcoinFeePriority) => this.uri(`/estimatefee/${priority}`);
    broadcastTransaction = () => this.uri('/sendtx/');

    private uri(path: string): string {
        return `${this.rpcUrl}/v2${path}`;
    }
}
