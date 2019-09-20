import BigNumber from 'bignumber.js';
import { TronAsset } from './TronAsset';
import 'reflect-metadata';
import { Expose, Transform, Type } from 'class-transformer';

class TronVote {
    @Expose({ name: 'vote_address'})
    voteAddress: string;

    @Expose({ name: 'vote_count'})
    voteCount: number;
}

class TronFrozenBalance {
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    @Expose({ name: 'frozen_balance'})
    frozenBalance: BigNumber;

    @Expose({ name: 'expire_time'})
    @Transform(value => new Date(value), { toClassOnly: true })
    expireTime: Date;
}

export class TronAccount {
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    balance: BigNumber;
    address: string;

    @Type(() => TronAsset)
    asset: TronAsset[];

    @Type(() => TronVote)
    vote: TronVote[];

    @Type(() => TronFrozenBalance)
    frozen: TronFrozenBalance[];

    @Type(() => TronFrozenBalance)
    @Expose({ name: 'frozen_supply' })
    frozenSupply: TronFrozenBalance[];
}
