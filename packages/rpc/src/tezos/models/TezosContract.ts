import 'reflect-metadata';
import { Transform, Expose } from 'class-transformer';
import BigNumber from 'bignumber.js';

export class TezosContract {
    @Expose()
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    balance: BigNumber
    @Expose()
    counter: String
}