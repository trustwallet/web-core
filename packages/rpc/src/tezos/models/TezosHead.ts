import 'reflect-metadata';
import { Type, Transform } from 'class-transformer';

class TezosBlockHeader {
    @Transform(value => BigInt(value), { toClassOnly: true })
    level: bigint
}

export class TezosHead {
    hash: String
    @Type(()=>TezosBlockHeader)
    header: TezosBlockHeader
}