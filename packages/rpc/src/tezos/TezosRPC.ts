import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { Query } from './Query';
import { TezosHead, TezosManagerKey, TezosOperationResult, TezosOperation } from './models';
import { TezosAccount } from './models/TezosAccount';

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

    async broadcastTransaction(data: string): Promise<TezosOperationResult> {
        const url = this.query().broadcastTransaction(data);
        const options = {
            validateStatus: (status: number) => {
                return status >= 200 && status < 500;
            },
        };
        const response = await axios.post(url, data, options);
        return plainToClass(TezosOperationResult, response.data);
    }
}
