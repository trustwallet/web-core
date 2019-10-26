import { BlockatlasValidator, BlockatlasStakingDetails } from './BlockatlasValidator';
import BigNumber from 'bignumber.js';
import { Transform, Type } from 'class-transformer';
import { BlockatlasResult } from './BlockatlasResult';
import { CoinType } from '@trustwallet/types';

export enum DelegationStatus {
    ACTIVE,
    PENDING
}

class DelegationMetadata {
    @Type(() => Date)
    available_date: Date;
}

class DelegationCoin {
    coin: CoinType;
    symbol: string;
    name: string;
    decimals: number;
}

export class BlockatlasDelegation {
    @Type(() => BlockatlasValidator)
    delegator: BlockatlasValidator;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    value: BigNumber;
    @Transform(status => {
        switch (status) {
            case "active":
                return DelegationStatus.ACTIVE;
            case "pending":
                return DelegationStatus.PENDING;
            default:
                return DelegationStatus.ACTIVE;
        }
    })
    status: DelegationStatus;
    @Type(() => DelegationMetadata)
    metadata: DelegationMetadata;
}

export class BlockatlasDelegationResult extends BlockatlasResult {
    @Type(() => BlockatlasDelegation)
    docs: BlockatlasDelegation[];
}

export class BlockatlasDelegationBatch {
    address: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    balance: BigNumber;
    @Type(() => DelegationCoin)
    coin: DelegationCoin;
    @Type(() => BlockatlasDelegation)
    delegations: BlockatlasDelegation[];
    @Type(() => BlockatlasStakingDetails)
    details: BlockatlasStakingDetails;
    error: string;
}

export class BlockatlasDelegationBatchResult extends BlockatlasResult {
    @Type(() => BlockatlasDelegationBatch)
    docs: BlockatlasDelegationBatch[];
}
