import 'reflect-metadata';
import { Transform } from "class-transformer";

export class BitcoinEstimateFee {
    @Transform(value => Number(value), { toClassOnly: true })
    result: number;
}
