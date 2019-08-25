import 'reflect-metadata';
import { Transform, Type } from 'class-transformer';
import BigNumber from 'bignumber.js';

class Token {
    type: string;
    name: string;
    path: string;
}

export class BitcoinBalanceResult {
    address: string;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    balance: BigNumber;

    @Type(() => Token)
    tokens: Token[];

    txids: string[];
}
