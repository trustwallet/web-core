import 'reflect-metadata';
import { Type } from 'class-transformer';
import { TezosBlockHeader } from './TezosBlockHeader';

export class TezosHead {
    hash: string;

    protocol: string;
    chain_id: string;

    @Type(() => TezosBlockHeader)
    header: TezosBlockHeader;
}