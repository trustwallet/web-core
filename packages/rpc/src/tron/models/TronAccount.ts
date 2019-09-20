import BigNumber from 'bignumber.js';
import { Transform, Type } from 'class-transformer';
import { Utils } from '../utils';

export class TronVote {
    vote_address: string;
    vote_count: number;
}

export class TronFrozen {
    @Transform(value => Utils.toTron(new BigNumber(value)))
    frozen_balance: BigNumber;

    @Type(() => Date)
    expire_time: Date;
}

export class TronAccountResource {
    energy_usage: number;

    @Type(() => TronFrozen)
    frozen_balance_for_energy: TronFrozen;

    @Type(() => Date)
    latest_consume_time_for_energy: Date;

    @Transform(value => Utils.toTron(new BigNumber(value)))
    acquired_delegated_frozen_balance_for_energy: number;

    @Transform(value => Utils.toTron(new BigNumber(value)))
    delegated_frozen_balance_for_energy: number;
}

export class TronAccount {
    account_name: string;
    address: string;
    @Transform(value => Utils.toTron(new BigNumber(value)))
    balance: BigNumber;

    @Type(() => TronVote)
    votes: TronVote[];

    @Type(() => TronFrozen)
    frozen: TronFrozen[];

    @Type(() => Date)
    create_time: Date;

    @Type(() => Date)
    latest_opration_time: Date;
    asset_issued_name: string;
    free_net_usage: number;

    @Type(() => Date)
    latest_consume_free_time: Date;

    @Type(() => TronAccountResource)
    account_resource: TronAccountResource;

    @Transform(value => Utils.toTron(new BigNumber(value)))
    acquired_delegated_frozen_balance_for_bandwidth: number;

    @Transform(value => Utils.toTron(new BigNumber(value)))
    delegated_frozen_balance_for_bandwidth: number;

    asset_issued_ID: string;
}
