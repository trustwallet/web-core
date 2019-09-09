import 'reflect-metadata';
import { Type, Transform } from 'class-transformer';
import BigNumber from 'bignumber.js';

class BinanceTokenBalance {
    symbol: String
    free: String
    locked: String
    frozen: String
}

export class BinanceAccount {
    address: String
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    account_number: BigNumber
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    sequence: BigNumber
    @Type(() => BinanceTokenBalance)
    balances: BinanceTokenBalance[]
}