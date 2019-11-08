import 'reflect-metadata';
import { Transform } from 'class-transformer';
import BigNumber from 'bignumber.js';

export class WavesCurrentHeight {
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    height: number;
}
