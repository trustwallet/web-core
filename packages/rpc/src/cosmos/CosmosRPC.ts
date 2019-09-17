import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { CosmosDelegation, CosmosAccount, CosmosBroadcastResult } from './models';
import { Query } from './Query';
import { CosmosAccountResult } from './models/CosmosAccount';
import { CosmosUnbond } from './models/CosmosUnbond';
import { CosmosAmount } from './models/CosmosAmount';
import BigNumber from 'bignumber.js';
import { Utils } from './utils';
import { CosmosStakingInfo } from './models/CosmosStakingInfo';
import { NetworkError } from '../error/network-error';
import { CosmosTx, CosmosTxInternalType } from './models/CosmosTx';

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
            plainToClass<CosmosAmount, any[]>(CosmosAmount, response.data).reduce(
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

    async listDelegationsTransactions(address: string, validator?: string): Promise<CosmosTx[]> {
        let response = await axios.get(this.query().listDelegationTransactions(address));
        return plainToClass<CosmosTx, any[]>(CosmosTx, response.data).filter(tx =>
            validator ? tx.tx.value.msg[0].value.validator_address === validator : true,
        );
    }

    async listStakingTransactions(address: string, validator?: string): Promise<CosmosTx[]> {
        let response = await axios.get(this.query().listDelegationTransactions(address));
        return plainToClass<CosmosTx, any[]>(CosmosTx, response.data).filter(
            tx =>
                tx.tx.value.msg[0].type === CosmosTxInternalType.DELEGATE &&
                (validator ? tx.tx.value.msg[0].value.validator_address === validator : true),
        );
    }

    async listUnstakingTransactions(address: string, validator?: string): Promise<CosmosTx[]> {
        let response = await axios.get(this.query().listDelegationTransactions(address));
        return plainToClass<CosmosTx, any[]>(CosmosTx, response.data).filter(
            tx =>
                tx.tx.value.msg[0].type === CosmosTxInternalType.UNDELEGATE &&
                (validator ? tx.tx.value.msg[0].value.validator_address === validator : true),
        );
    }

    async broadcastTransaction(data: string): Promise<CosmosBroadcastResult> {
        const url = this.query().broadcastTransaction();
        const options = {
            validateStatus: (status: number) => {
                return status >= 200 && status <= 500;
            },
        };
        const response = await axios.post(url, data, options);
        if (response.status >= 200 && response.status <= 300) {
            return plainToClass(CosmosBroadcastResult, response.data);
        } else {
            throw new NetworkError(response.status, response.data);
        }
    }
}
