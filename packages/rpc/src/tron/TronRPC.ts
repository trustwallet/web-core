import { Query } from './Query';
import axios from 'axios';
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { TronAccount, TronBlock, TronBroadcastResult, TronTransaction } from './models';
import { NetworkError } from '../errors/network-error';

export class TronRPC {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    private query(): Query {
        return new Query(this.rpcUrl);
    }

    async getNowBlock(): Promise<TronBlock> {
        let response = await axios.post(this.query().getNowBlock());
        return plainToClass(TronBlock, response.data);
    }

    async getAccount(address: string): Promise<TronAccount> {
        let response = await axios.post(this.query().getAccount(), {
            address, visible: true
        });
        return plainToClass(TronAccount, response.data);
    }

    async getTransaction(id: string): Promise<TronTransaction> {
        let response = await axios.post(this.query().getTransactionById(), {
            value: id
        });
        return plainToClass(TronTransaction, response.data);
    }

    async broadcastTransaction(data: string): Promise<TronBroadcastResult> {
        try {
            let response = await axios.post(this.query().broadcastTransaction(), data);
            return plainToClass(TronBroadcastResult, response.data);
        } catch (error) {
            if (error.response) {
                throw new NetworkError(error.response.status, error.response.data);
            } else {
                throw error;
            }
        }
    }
}
