import 'reflect-metadata';
import axios from 'axios';
import { plainToClass } from 'class-transformer';
import {
    BlockatlasValidatorResult,
    BlockatlasDelegationResult,
    BlockatlasDelegationBatchResult,
} from './models';
import { Query } from './Query';
import { CoinType, CoinTypeUtils } from '@trustwallet/types';

export class BlockatlasRPC {
    rpcUrl: string;
    network: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    private query(coin: CoinType | null = null): Query {
        const network = coin != null
            ? CoinTypeUtils.id(coin)
            : null;

        return new Query(this.rpcUrl, network);
    }

    async listTransactions(coin: CoinType, address: string): Promise<BlockatlasValidatorResult> {
        const response = await axios.get(this.query(coin).listTransactions(address));
        return plainToClass(BlockatlasValidatorResult, response.data);
    }

    async listValidators(coin: CoinType): Promise<BlockatlasValidatorResult> {
        const response = await axios.get(this.query(coin).listValidators());
        return plainToClass(BlockatlasValidatorResult, response.data);
    }

    async listDelegations(coin: CoinType, address: string): Promise<BlockatlasDelegationResult> {
        const response = await axios.get(this.query(coin).listDelegations(address));
        return plainToClass(BlockatlasDelegationResult, response.data);
    }

    async listDelegationsBatch(request: { coin: CoinType, address: string }[]): Promise<BlockatlasDelegationBatchResult> {
        const response = await axios.post(this.query().listDelegationsBatch(), request);
        return plainToClass(BlockatlasDelegationBatchResult, response.data);
    }
}
