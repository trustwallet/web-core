import 'reflect-metadata';
import { Type, Transform } from 'class-transformer';
import BigNumber from 'bignumber.js';

class Delegate {
    setable: boolean;
    value?: string;
}

export class TezosAccount {
    manager: string;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    balance: BigNumber;

    spendable: boolean;

    @Type(() => Delegate)
    delegate: Delegate;

    counter: string;
}