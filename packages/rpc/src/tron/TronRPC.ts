import { Query } from './Query';
import 'reflect-metadata';
import { NetworkError } from '../errors/network-error';
import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { TronAccount, TronFrozen, TronVote } from './models/TronAccount';
import { TronBroadcastResult } from './models/TronBroadcastResult';
import { TronBlock, TronTransaction } from './models';

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
            (acc, frozen) => (frozen.expire_time.getTime() > acc.getTime() ? frozen.expire_time : acc),
            new Date(),
        );
    }

    async getStakingParameters(): Promise<{ holdTime: number }> {
        return { holdTime: 3 };
    }

    async broadcastTransaction(data: string): Promise<TronBroadcastResult> {
        try {
            const url = this.query().broadcastTransaction();
            const response = await axios.post(url, data);

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
