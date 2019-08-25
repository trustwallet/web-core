import { BitcoinUnspentResult } from './bitcoin/models/BitcoinUnspentResult';
import { BitcoinTx } from './bitcoin/models/BitcoinTransaction';
import { BitcoinBroadcastResult } from './bitcoin/models/BitcoinBroadcastResult';

export interface RPC {
    getLatestBlock(): Promise<string>;
    getBalance(xpub: string): Promise<string>;
    listUnspent(xpub: string): Promise<BitcoinUnspentResult[]>;
    listTransactions(address: string): Promise<string[]>;
    getTransactionDetail(hash: string): Promise<BitcoinTx>;
    estimateFee(priority: number): Promise<any>;
    broadcastTransaction(data: string): Promise<BitcoinBroadcastResult>;
}
