import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { CosmosDelegation, CosmosAccount, CosmosBroadcastResult } from './models';
import { Query } from './Query';
import { CosmosAccountResult } from './models/CosmosAccount';
import { CosmosUnbond } from './models/CosmosUnbond';
import { CosmosReward } from './models/CosmosReward';
import BigNumber from 'bignumber.js';
import { Utils } from './utils';
import { CosmosStakingInfo } from './models/CosmosStakingInfo';
import { NetworkError } from '../errors/network-error';

export class CosmosRPC {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    private query(): Query {
        return new Query(this.rpcUrl);
    }

    async listDelegations(address: string): Promise<CosmosDelegation[]> {
        let response = await axios.get(this.query().listDelegations(address));
        return plainToClass<CosmosDelegation, any[]>(CosmosDelegation, response.data);
    }

    async listUnbondDelegations(address: string): Promise<CosmosUnbond[]> {
        let response = await axios.get(this.query().listUnbondDelegations(address));
        return plainToClass<CosmosUnbond, any[]>(CosmosUnbond, response.data);
    }

    async getAccount(address: string): Promise<CosmosAccount> {
        let response = await axios.get(this.query().getAccount(address));
        return plainToClass(CosmosAccountResult, response.data).value;
    }

    async getRewards(address: string): Promise<BigNumber> {
        let response = await axios.get(this.query().getRewards(address));
        return Utils.toAtom(
            plainToClass<CosmosReward, any[]>(CosmosReward, response.data).reduce(
                (acc, reward) => acc.plus(reward.amount),
                new BigNumber(0),
            ),
        );
    }

    async unstakingReleaseDate(address: string): Promise<Date> {
        const unbonds = await this.listUnbondDelegations(address);
        return new Date(unbonds.reduce((acc, unbond) => Math.max(acc, unbond.getReleaseDate().getTime()), 0));
    }

    async getStakingParameters(): Promise<CosmosStakingInfo> {
        let response = await axios.get(this.query().getStakingParameters());
        return plainToClass(CosmosStakingInfo, response.data);
    }

    async broadcastTransaction(data: string): Promise<CosmosBroadcastResult> {
        try {
            const url = this.query().broadcastTransaction();
            const response = await axios.post(url, data);
            return plainToClass(CosmosBroadcastResult, response.data);
        } catch (error) {
            if (error.response) {
                throw new NetworkError(error.response.status, error.response.data);
            } else {
                throw error;
            }
        }
    }
}
