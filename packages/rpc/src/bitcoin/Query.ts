import { BitcoinFeePriority } from './BitcoinFeePriority';

export class Query {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    getLatestBlock = () => this.uri(`/`);
    getBalance = (xpub: string) => this.uri(`/xpub/${xpub}?tokens=used`);
    listUnspent = (xpub: string) => this.uri(`/utxo/${xpub}`);
    listTransactions = (address: string) => this.uri(`/address/${address}`);
    getTransactionDetail = (hash: string) => this.uri(`/tx/${hash}`);
    estimateFee = (priority: BitcoinFeePriority) => this.uri(`/estimatefee/${priority}`);
    broadcastTransaction = () => this.uri('/sendtx/');

    private uri(path: string): string {
        return `${this.baseUrl}/v2${path}`;
    }
}
