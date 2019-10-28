import axios from 'axios';
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { Query } from './Query';
import { TezosContract, TezosHead, TezosOperation, TezosOperationResult } from './models';
import { NetworkError } from '../errors/network-error';

export class TezosRPC {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    private query(): Query {
        return new Query(this.rpcUrl);
    }

    async getAccount(contractId: string): Promise<TezosContract> {
        let response = await axios.get(this.query().getAccount(contractId));
        return plainToClass(TezosContract, response.data);
    }

    async getHead(): Promise<TezosHead> {
        let response = await axios.get(this.query().getHead());
        return plainToClass(TezosHead, response.data);
    }

    async getManagerKey(contractId: string): Promise<string> {
        let response = await axios.get(this.query().getManagerKey(contractId));
        return response.data;
    }

    async getBlockOperations(block: string): Promise<TezosOperation[]> {
        let response = await axios.get(this.query().getBlockOperations(block));
        const flattened: any[] = [].concat(...response.data);

        return plainToClass(TezosOperation, flattened);
    }

    async broadcastTransaction(data: string): Promise<TezosOperationResult> {
        try {
            const url = this.query().broadcastTransaction();
            const options = {
                headers: {
                    'content-type': 'application/json',
                },
            };
            const response = await axios.post(url, `"${data}"`, options);
            return plainToClass(TezosOperationResult, response.data);
        }catch (error) {
            if (error.response) {
                throw new NetworkError(error.response.status, error.response.data);
            } else {
                throw error;
            }
        }
    }
}
