import rp from 'request-promise';
import { deserialize, deserializeArray } from 'class-transformer';
import { BitcoinChainInfo } from '../models/bitcoin-chain-info.model';
import BigNumber from 'bignumber.js';
import { BitcoinTxBroadcastResult } from '../models/bitcoin-tx-broadcast-result.model';
import { BitcoinAddressInfo } from '../models/bitcoin-address-info.model';
import { BitcoinUnspentResult } from '../models/bitcoin-unspent-result.model';
import { BitcoinTx } from '../models/bitcoin-tx.model';
import { Service } from 'typedi';
import { QueriesI, Query } from './query';

/* Doe to lack of types reflection ability in TypeScript
we have to explicitly infer types based on query type */
@Service()
export class Requester {
    async request<T>(query: QueriesI, params: any = {}): Promise<AllTypes> {
        switch (query.action) {
            case Query.STATUS:
                return deserialize(BitcoinChainInfo, await rp(query.url, params));
            case Query.BLOCK_INDEX:
                const res = deserialize(BitcoinChainInfo, await rp(query.url, params));
                return res.backend.blocks;
            case Query.TX:
                return deserialize(BitcoinTx, await rp(query.url, params));
            case Query.ADDRESS:
                return deserialize(BitcoinAddressInfo, await rp(query.url, params));
            case Query.XPUB:
                return deserialize(BitcoinAddressInfo, await rp(query.url, params));
            case Query.UTXO:
                return deserializeArray(BitcoinUnspentResult, await rp(query.url, params));
            case Query.BLOCK:
                return deserialize(BitcoinAddressInfo, await rp(query.url, params));
            case Query.SENDTX:
                return deserialize(BitcoinTxBroadcastResult, await rp(query.url, params));
            default:
                return {} as any;
        }
    }
}

/* Dirty hack to simulate types reflection */
type AllTypes =
    | BitcoinChainInfo
    | BitcoinTxBroadcastResult
    | BitcoinAddressInfo
    | BitcoinTx
    | BitcoinUnspentResult[]
    | BigNumber;
