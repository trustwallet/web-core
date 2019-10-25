import { Transform } from 'class-transformer';
import BigNumber from 'bignumber.js';

export class TezosBalanceUpdate {
    kind: string;
    category?: string;
    contract?: string;
    delegate?: string;
    cycle?: number;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    change: BigNumber;
}
