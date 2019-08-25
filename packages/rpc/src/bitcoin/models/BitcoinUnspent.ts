import BigNumber from 'bignumber.js';
import { Transform } from 'class-transformer';

export class BitcoinUnspent {
    address: string;
    hash: string;
    index: number;
    script: string;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    value: BigNumber;
}
