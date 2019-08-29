import 'reflect-metadata';
import BigNumber from 'bignumber.js';
import { QueryBuilder } from './Query';
import { EthereumAssesBalances, EthereumTransactionDetail } from './models';
import { plainToClass } from 'class-transformer';

export class EthereumRPC {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    private query(): QueryBuilder {
        return new QueryBuilder(this.rpcUrl);
    }

    async getBlockHeight(): Promise<BigNumber> {
        const response = await this.query()
            .scheduleGetLatestBlock()
            .execute();
        return new BigNumber(response.result);
    }

    async getAccountBalance(asset: string): Promise<BigNumber> {
        const response = await this.query()
            .scheduleGetBalance(asset)
            .execute();
        return new BigNumber(response.result);
    }

    async getTransactionDetail(hash: string): Promise<EthereumTransactionDetail> {
        const response = await this.query()
            .scheduleGetTransactionDetail(hash)
            .execute();
        return plainToClass(EthereumTransactionDetail, response.result);
    }

    async estimateNonce(address: string): Promise<BigNumber> {
        const response = await this.query()
            .scheduleEstimateNonce(address)
            .execute();
        return new BigNumber(response.result);
    }

    async getGasPrice(): Promise<BigNumber> {
        const response = await this.query()
            .scheduleEstimateGasPrice()
            .execute();
        return new BigNumber(response.result);
    }

    async getAllTokenBalances(assets: string[]): Promise<EthereumAssesBalances> {
        const balances = await Promise.all(assets.map(asset => this.getAccountBalance(asset)));
        return balances.reduce((acc, balance, index) => {
            acc[assets[index]] = balance;
            return acc;
        }, {});
    }

    async estimateGasLimit(
        from: string,
        to: string,
        amount: number,
        gasPrice: number,
        payloadData: any,
    ): Promise<BigNumber> {
        const response = await this.query()
            .scheduleEstimateGasLimit(from, to, amount, gasPrice, payloadData)
            .execute();
        return new BigNumber(response.result);
    }

    async broadcastTransaction(data: string): Promise<string> {
        const response = await this.query()
            .scheduleBroadcastTransaction(data)
            .execute();
        return response.result;
    }
}
