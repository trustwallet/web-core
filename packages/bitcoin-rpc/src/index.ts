import 'reflect-metadata';
import { Container, Inject, Service } from 'typedi';
import { BitcoinAddressInfo } from './models/bitcoin-address-info.model';
import { BitcoinUnspentResult } from './models/bitcoin-unspent-result.model';
import { BitcoinTx } from './models/bitcoin-tx.model';
import { BitcoinTxBroadcastResult } from './models/bitcoin-tx-broadcast-result.model';
import { Requester } from './services/requester.service';
import { QueriesBuilder } from './services/query-builder';
import { RPC } from './rpc';

@Service()
class BitcoinRPCWrapped implements RPC {
    constructor(
        @Inject('blockbookAddr') addr: string,
        private requester: Requester,
        private queryBuilder: QueriesBuilder,
    ) {
        if (!addr) {
            try {
                require('dotenv').config();
                addr = process.env.BLOCKBOOK_ADDR as string;
                Container.set('blockbookAddr', addr);
            } catch (e) {
                console.error(`No env file found!`);
            }
        }
    }

    async getLatestBlock(): Promise<string> {
        return (await this.requester.request({
            action: this.queryBuilder.STATUS.action,
            url: this.queryBuilder.STATUS.url(),
        })).toString();
    }
    async getBalance(xpub: string): Promise<string> {
        return ((await this.requester.request({
            action: this.queryBuilder.XPUB.action,
            url: this.queryBuilder.XPUB.url(xpub),
        })) as BitcoinAddressInfo).balance.toString();
    }
    async listUnspent(xpub: string): Promise<BitcoinUnspentResult[]> {
        return (await this.requester.request({
            action: this.queryBuilder.UTXO.action,
            url: this.queryBuilder.UTXO.url(xpub),
        })) as BitcoinUnspentResult[];
    }
    async listTransactions(address: string): Promise<string[]> {
        return ((await this.requester.request({
            action: this.queryBuilder.ADDRESS.action,
            url: this.queryBuilder.ADDRESS.url(address),
        })) as BitcoinAddressInfo).txids;
    }
    async getTransactionDetail(hash: string): Promise<BitcoinTx> {
        return (await this.requester.request({
            action: this.queryBuilder.TX.action,
            url: this.queryBuilder.TX.url(hash),
        })) as BitcoinTx;
    }
    // TODO: Seems this old API does not work.
    //  Need to be replaced with own implementation
    //  (scanning N number of blocks and calculating fee based on TX size)
    async estimateFee(priority: number): Promise<any> {
        return await this.requester.request({
            action: this.queryBuilder.FEE.action,
            url: this.queryBuilder.FEE.url(priority),
        });
    }
    async broadcastTransaction(data: string): Promise<BitcoinTxBroadcastResult> {
        return (await this.requester.request(
            {
                action: this.queryBuilder.SENDTX.action,
                url: this.queryBuilder.SENDTX.url(),
            },
            {
                method: 'POST',
                body: data,
            },
        )) as BitcoinTxBroadcastResult;
    }
}

export const BitcoinRPC: (blockbookAddr?: string) => RPC = (blockbookAddr?: string) => {
    if (blockbookAddr) {
        Container.set('blockbookAddr', blockbookAddr);
    }
    return Container.get(BitcoinRPCWrapped);
};
