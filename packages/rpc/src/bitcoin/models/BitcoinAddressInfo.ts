import BigNumber from 'bignumber.js';
import { Transform } from 'class-transformer';

export class BitcoinAddressInfo {
    page: number;
    totalPages: number;
    itemsOnPage: number;

    address: string;
    txids: string[];

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    balance: BigNumber;
}
