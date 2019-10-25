import 'reflect-metadata';
import { Type, Expose, Transform } from 'class-transformer';
import BigNumber from 'bignumber.js';
import { TezosBalanceUpdate } from './TezosBalanceUpdate';
import { TezosOperationResult } from './TezosOperationResult';

class TezosMetadata {
    @Type(() => TezosBalanceUpdate)
    @Expose({ name: 'balance_updates' })
    balanceUpdates: TezosBalanceUpdate[];

    @Type(() => TezosOperationResult)
    @Expose({ name: 'operation_result' })
    operationResult?: TezosOperationResult;

    delegate?: string;

    slots?: number[];
}

class TezosContent {
    kind: string;

    level?: number;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    fee?: BigNumber;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    counter?: BigNumber;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    @Expose({ name: 'gas_limit' })
    gasLimit?: BigNumber;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    @Expose({ name: 'storage_limit' })
    storageLimit?: BigNumber;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    amount?: BigNumber;

    destination?: string;

    source?: string;

    @Type(() => TezosMetadata)
    metadata: TezosMetadata;
}

export class TezosOperation {
    protocol: string;
    hash: string;
    branch: string;

    @Expose({ name: 'chain_id' })
    chainId: string;

    @Type(() => TezosContent)
    contents: TezosContent[];
}
