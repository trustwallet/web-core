import 'reflect-metadata';
import { Type } from 'class-transformer';
import { TezosOperationResult } from './TezosOperationResult';

class TezosMetadata {
    @Type(() => TezosOperationResult)
    operation_result?: TezosOperationResult;
}

class TezosContent {
    @Type(() => TezosMetadata)
    metadata: TezosMetadata;
}

export class TezosOperation {
    hash: string;

    @Type(() => TezosContent)
    contents: TezosContent[];
}