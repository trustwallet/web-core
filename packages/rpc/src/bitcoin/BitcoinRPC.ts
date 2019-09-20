import 'reflect-metadata';
import axios from 'axios';
import { plainToClass } from 'class-transformer';
import BigNumber from 'bignumber.js';
import { Query } from './Query';
import {
    BitcoinBalanceResult,
    BitcoinBroadcastResult,
    BitcoinTransactionDetail,
    BitcoinUnspentResult,
    BitcoinFeePriority,
} from './models';
import { BitcoinEstimateFee } from './models/BitcoinEstimateFee';
import { BitcoinChainInfo } from './models/BitcoinChainInfo';
import { BitcoinAddressInfo } from './models/BitcoinAddressInfo';
import { NetworkError } from '../errors/network-error';

export class BitcoinRPC {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    private query(): Query {
        return new Query(this.rpcUrl);
    }

    async getLatestBlock(): Promise<BigNumber> {
        const url = this.query().getLatestBlock();
        const response = await axios.get(url);
        return plainToClass(BitcoinChainInfo, response.data).backend.blocks;
    }

    async getBalance(xpub: string): Promise<BitcoinBalanceResult> {
        const url = this.query().getBalance(xpub);
        const response = await axios.get(url);
        return plainToClass(BitcoinBalanceResult, response.data);
    }

    async listUnspent(xpub: string): Promise<BitcoinUnspentResult[]> {
        const url = this.query().listUnspent(xpub);
        const response = await axios.get(url);
        return plainToClass(BitcoinUnspentResult, response.data as []);
    }

    async listTransactions(address: string): Promise<string[]> {
        const url = this.query().listTransactions(address);
        const response = await axios.get(url);
        return plainToClass(BitcoinAddressInfo, response.data).txids;
    }

    async getTransactionDetail(hash: string): Promise<BitcoinTransactionDetail> {
        const url = this.query().getTransactionDetail(hash);
        const response = await axios.get(url);
        return plainToClass(BitcoinTransactionDetail, response.data);
    }

    async estimateFee(priority: BitcoinFeePriority): Promise<number> {
        const url = this.query().estimateFee(priority);
        const response = await axios.get(url);
        return plainToClass(BitcoinEstimateFee, response.data).result;
    }

    async broadcastTransaction(data: string): Promise<BitcoinBroadcastResult> {
        try {
            const url = this.query().broadcastTransaction();
            const options = {
                headers: {
                    'content-type': 'text/plain; charset=utf-8',
                },
            };
            const response = await axios.post(url, data, options);
            return plainToClass(BitcoinBroadcastResult, response.data);
        } catch (error) {
            if (error.response) {
                throw new NetworkError(error.response.status, error.response.data);
            } else {
                throw error;
            }
        }
    }
}
