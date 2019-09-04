import 'reflect-metadata';
import { Type, Expose } from 'class-transformer';
import { TezosBlockHeader } from './TezosBlockHeader';

export class TezosHead {
    hash: string;

    protocol: string;
    @Expose({ name: "chain_id" })
    chainId: string;

    @Type(() => TezosBlockHeader)
    header: TezosBlockHeader;
}
