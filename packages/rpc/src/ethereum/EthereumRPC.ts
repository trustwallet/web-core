import 'reflect-metadata';
import axios from 'axios';
import { plainToClass } from 'class-transformer';
import BigNumber from 'bignumber.js';
import { Query } from './Query';
import { EthereumChainInfo } from './models/EthereumChainInfo';
import { EthereumBroadcastResult } from './models/EthereumBroadcastResult';
import { EthereumAddressInfo } from './models/EthereumAddressInfo';
import { EthereumTransactionDetail } from './models/EthereumTransactionDetail';
import { EthereumBlock } from './models/EthereumBlock';
import { EthereumAssesBalances } from './models/EthereumAssesBalances';
import { ETHEREUM_GAS_TRANSACTION, ETHEREUM_GAS_TXDATANONZERO } from './consts';

export class EthereumRPC {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    private query(): Query {
        return new Query(this.rpcUrl);
    }

    async getBlockHeight(): Promise<BigNumber> {
        const url = this.query().getLatestBlock();
        const response = await axios.get(url);
        return plainToClass(EthereumChainInfo, response.data).backend.blocks;
    }

    async getAccountBalance(asset: string): Promise<BigNumber> {
        const url = this.query().getBalance(asset);
        const response = await axios.get(url);
        return plainToClass(EthereumAddressInfo, response.data).balance;
    }

    async getTransactionDetail(hash: string): Promise<EthereumTransactionDetail> {
        const url = this.query().getTransactionDetail(hash);
        const response = await axios.get(url);
        return plainToClass(EthereumTransactionDetail, response.data);
    }

    async estimateNonce(address: string): Promise<BigNumber> {
        const url = this.query().addressInfo(address);
        const addressRawData = await axios.get(url);
        const addrInfo = plainToClass(EthereumAddressInfo, addressRawData.data);
        if (!addrInfo.txids || addrInfo.txids.length === 0) {
            return new BigNumber(0);
        }
        const txInfo = await this.getTransactionDetail(addrInfo.txids[0]);
        return new BigNumber(txInfo.ethereumSpecific.nonce);
    }

    async getGasPrice(): Promise<BigNumber> {
        const blockUrl = this.query().getBlock((await this.getBlockHeight()).toNumber());
        const blockRaw = await axios.get(blockUrl);
        const block = plainToClass(EthereumBlock, blockRaw.data);
        const tx = await this.getTransactionDetail(block.txs[0].txid);
        return tx.ethereumSpecific.gasPrice;
    }

    async getAllTokenBalances(assets: string[]): Promise<EthereumAssesBalances> {
        const balances = await Promise.all(assets.map(asset => this.getAccountBalance(asset)));
        return balances.reduce((acc, balance, index) => {
            acc[assets[index]] = balance;
            return acc;
        }, {});
    }

    estimateGasLimit(payloadData: string): number {
        return ETHEREUM_GAS_TRANSACTION + ETHEREUM_GAS_TXDATANONZERO * this.byteCount(payloadData);
    }

    async broadcastTransaction(data: string): Promise<EthereumBroadcastResult> {
        const url = this.query().broadcastTransaction();
        const options = {
            headers: {
                'content-type': 'text/plain; charset=utf-8',
            },
            validateStatus: (status: number) => {
                return status >= 200 && status < 500;
            },
        };
        const response = await axios.post(url, data, options);
        return plainToClass(EthereumBroadcastResult, response.data);
    }

    private byteCount(s: string): number {
        return encodeURI(s).split(/%..|./).length - 1;
    }
}
