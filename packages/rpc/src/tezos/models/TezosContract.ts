import { Transform } from 'class-transformer';
import BigNumber from 'bignumber.js';

export class TezosContract {
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    balance: BigNumber;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    counter: BigNumber;
}
