import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { Query } from './Query';
import { TezosHead, TezosManagerKey, TezosOperationResult, TezosOperation } from './models';
import { TezosAccount } from './models/TezosAccount';
import { NetworkError } from '../errors/network-error';

export class TezosRPC {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    private query(): Query {
        return new Query(this.rpcUrl);
    }

    async getAccount(contractId: string): Promise<TezosAccount> {
        let response = await axios.get(this.query().getAccount(contractId));
        return plainToClass(TezosAccount, response.data);
    }

    /**
     * @todo
     */
    async getHead(): Promise<TezosHead> {
        let response = await axios.get(this.query().getHead());
        return plainToClass(TezosHead, response.data);
    }

    async getManagerKey(contractId: string): Promise<TezosManagerKey> {
        let response = await axios.get(this.query().getManagerKey(contractId));
        return plainToClass(TezosManagerKey, response.data);
    }

    async getBlockOperations(block: string): Promise<TezosOperation> {
        let response = await axios.get(this.query().getBlockOperations(block));
        return plainToClass(TezosOperation, response.data);
    }

    async getKt1Address(contractId: string): Promise<string|null> {
        const manager = await this.getManagerKey(contractId);
        if (manager.key === undefined) { return null }

        return manager.key;
    }

    async broadcastTransaction(data: string): Promise<TezosOperationResult> {
        try {
            const url = this.query().broadcastTransaction();
            const response = await axios.post(url, data);
            return plainToClass(TezosOperationResult, response.data);
        } catch (error) {
            if (error.response) {
                throw new NetworkError(error.response.status, error.response.data);
            } else {
                throw error;
            }
        }
    }
}
