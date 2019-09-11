import 'reflect-metadata';
import { Type, Transform, Expose } from 'class-transformer';
import BigNumber from 'bignumber.js';

class BinanceTokenBalance {
    symbol: string;
    free: string;
    locked: string;
    frozen: string;
}

export class BinanceAccount {
    address: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    @Expose({ name: 'account_number' })
    accountNumber: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    sequence: BigNumber;
    @Type(() => BinanceTokenBalance)
    balances: BinanceTokenBalance[];
}
