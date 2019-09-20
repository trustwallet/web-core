import { Query } from './Query';
import 'reflect-metadata';
import { NetworkError } from '../errors/network-error';
import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { TronAccount, TronFrozen, TronVote } from './models/TronAccount';
import { TronBroadcastResult } from './models/TronBroadcastResult';
import { TronBlock, TronTransaction } from './models';
import { ClassType } from 'class-transformer/ClassTransformer';
import { TronStakingInfo } from './models/TronStakingInfo';

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
            address,
            visible: true,
        });
        return plainToClass(TronAccount, response.data);
    }

    async getTransaction(id: string): Promise<TronTransaction> {
        let response = await axios.post(this.query().getTransactionById(), {
            value: id,
        });
        return plainToClass(TronTransaction, response.data);
    }

    async listDelegations(address: string): Promise<TronVote[]> {
        const account = await this.getAccount(address);
        return account.votes;
    }

    async listFrozen(address: string): Promise<TronFrozen[]> {
        const account = await this.getAccount(address);
        return account.frozen;
    }

    async unstakingReleaseDate(address: string): Promise<Date> {
        const account = await this.getAccount(address);
        return account.frozen.reduce(
            (acc, frozen) => (frozen.expireTime.getTime() > acc.getTime() ? frozen.expireTime : acc),
            new Date(),
        );
    }

    async getStakingParameters(): Promise<TronStakingInfo> {
        return plainToClass(TronStakingInfo, { lockTime: 3 });
    }

    async freezeBalance(data: string): Promise<TronBroadcastResult> {
        return await this.postData(this.query().freezeBalance(), data, TronBroadcastResult);
    }

    async unfreezeBalance(data: string): Promise<TronBroadcastResult> {
        return await this.postData(this.query().unfreezeBalance(), data, TronBroadcastResult);
    }

    async broadcastTransaction(data: string): Promise<TronBroadcastResult> {
        return await this.postData(this.query().broadcastTransaction(), data, TronBroadcastResult);
    }

    private async postData<T>(url: string, data: string, cls: ClassType<T>): Promise<T> {
        try {
            const response = await axios.post(url, data);

            return plainToClass(cls, response.data);
        } catch (error) {
            if (error.response) {
                throw new NetworkError(error.response.status, error.response.data);
            } else {
                throw error;
            }
        }
    }
}
