import 'reflect-metadata';
import { Transform } from 'class-transformer';
import BigNumber from 'bignumber.js';

export class WavesAddress {
    address: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    regular: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    generating: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    available: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    effective: BigNumber;

}
