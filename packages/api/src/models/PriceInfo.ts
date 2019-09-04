import { Transform, Type } from 'class-transformer';
import BigNumber from 'bignumber.js';

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
