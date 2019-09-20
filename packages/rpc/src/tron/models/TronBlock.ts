import 'reflect-metadata';
import { Expose, Transform, Type } from 'class-transformer';
import BigNumber from 'bignumber.js';

class TronBlockRawData {
    version: number;
    txTrieRoot: string;
    parentHash: string;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    timestamp: BigNumber;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    number: BigNumber;

    @Expose({ name: 'witness_address' })
    witnessAddress: string;
}

class TronBlockHeader {
    @Expose({ name: 'raw_data' })
    @Type(() => TronBlockRawData)
    rawData: TronBlockRawData;
}

export class TronBlock {
    blockID: string;

    @Expose({ name: 'block_header' })
    @Type(() => TronBlockHeader)
    blockHeader: TronBlockHeader;
}
