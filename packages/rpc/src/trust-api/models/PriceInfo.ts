import { Transform, Type } from 'class-transformer';
import BigNumber from 'bignumber.js';

export class Blockchain {
    blockchainId: string;
    currencyName: string;
    currencySymbol: string;
    bestAnnualRate: number;
    iconUri: string;
}

export class CoinPrice {
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    price: BigNumber;
    contract: string;
    percent_change_24h: string;
}

export class PriceResponse {
    status: boolean;

    @Type(() => CoinPrice)
    docs: CoinPrice[];

    currency: string;
}
