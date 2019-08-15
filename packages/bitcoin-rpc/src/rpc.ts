import { BitcoinUnspentResult } from './models/bitcoin-unspent-result.model';
import { BitcoinTx } from './models/bitcoin-tx.model';
import { BitcoinTxBroadcastResult } from './models/bitcoin-tx-broadcast-result.model';

export interface RPC {
    getLatestBlock(): Promise<string>;
    getBalance(xpub: string): Promise<string>;
    listUnspent(xpub: string): Promise<BitcoinUnspentResult[]>;
    listTransactions(address: string): Promise<string[]>;
    getTransactionDetail(hash: string): Promise<BitcoinTx>;
    estimateFee(priority: number): Promise<any>;
    broadcastTransaction(data: string): Promise<BitcoinTxBroadcastResult>;
}
