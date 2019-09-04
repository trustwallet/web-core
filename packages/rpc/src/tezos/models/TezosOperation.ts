import 'reflect-metadata';
import { Type, Expose } from 'class-transformer';
import { TezosOperationResult } from './TezosOperationResult';

class TezosMetadata {
    @Type(() => TezosOperationResult)
    @Expose({ name: "operation_result" })
    operationresult?: TezosOperationResult;
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
