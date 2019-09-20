import BigNumber from 'bignumber.js';
import { Expose, Transform, Type } from 'class-transformer';
import { Utils } from '../utils';

export class TronVote {
    @Expose({ name: 'vote_address' })
    voteAddress: string;

    @Expose({ name: 'vote_count' })
    voteCount: number;
}

export class TronFrozen {
    @Transform(value => Utils.toTron(new BigNumber(value)))
    @Expose({ name: 'frozen_balance' })
    frozenBalance: BigNumber;

    @Type(() => Date)
    @Expose({ name: 'expire_time' })
    expireTime: Date;
}

export class TronAccountResource {
    @Expose({ name: 'energy_usage' })
    energyUsage: number;

    @Type(() => TronFrozen)
    @Expose({ name: 'frozen_balance_for_energy' })
    frozenBalanceForEnergy: TronFrozen;

    @Type(() => Date)
    @Expose({ name: 'latest_consume_time_for_energy' })
    latestConsumeTimeForEnergy: Date;

    @Transform(value => Utils.toTron(new BigNumber(value)))
    @Expose({ name: 'acquired_delegated_frozen_balance_for_energy' })
    acquiredDelegatedFrozenBalanceForEnergy: number;

    @Transform(value => Utils.toTron(new BigNumber(value)))
    @Expose({ name: 'delegated_frozen_balance_for_energy' })
    delegatedFrozenBalanceForEnergy: number;
}

export class TronAccount {
    @Expose({ name: 'account_name' })
    accountName: string;

    address: string;

    @Transform(value => Utils.toTron(new BigNumber(value)))
    balance: BigNumber;

    @Type(() => TronVote)
    votes: TronVote[];

    @Type(() => TronFrozen)
    frozen: TronFrozen[];

    @Type(() => Date)
    @Expose({ name: 'create_time' })
    createTime: Date;

    @Type(() => Date)
    @Expose({ name: 'latest_opration_time' })
    latestOprationTime: Date;

    @Expose({ name: 'asset_issued_name' })
    assetIssuedName: string;

    @Expose({ name: 'free_net_usage' })
    freeNetUsage: number;

    @Type(() => Date)
    @Expose({ name: 'latest_consume_free_time' })
    latestConsumeFreeTime: Date;

    @Type(() => TronAccountResource)
    @Expose({ name: 'account_resource' })
    accountResource: TronAccountResource;

    @Transform(value => Utils.toTron(new BigNumber(value)))
    @Expose({ name: 'acquired_delegated_frozen_balance_for_bandwidth' })
    acquiredDelegatedFrozenBalanceForBandwidth: number;

    @Transform(value => Utils.toTron(new BigNumber(value)))
    @Expose({ name: 'delegated_frozen_balance_for_bandwidth' })
    delegatedFrozenBalanceForBandwidth: number;

    @Expose({ name: 'asset_issued_ID' })
    assetIssuedID: string;
}
