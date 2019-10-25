import { Expose, Transform, Type } from 'class-transformer';
import BigNumber from 'bignumber.js';
import { TezosOperationError } from './TezosOperationError';
import { TezosBalanceUpdate } from './TezosBalanceUpdate';

export class TezosOperationResult {
    status: string;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    @Expose({ name: 'consumed_gas' })
    consumedGas: BigNumber;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    @Expose({ name: 'storage_size' })
    storageSize: BigNumber;

    @Type(() => TezosOperationError)
    errors?: TezosOperationError[];

    @Type(() => TezosBalanceUpdate)
    @Expose({ name: 'balance_updates' })
    balanceUpdates?: TezosBalanceUpdate[];
}
