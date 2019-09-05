import 'reflect-metadata';
import { Type, Expose } from 'class-transformer';

class TezosOperationError {
    @Expose()
    kind: String
}

class TezosOperationResult {
    @Expose()
    status: String
    @Expose()
    @Type(()=>TezosOperationError)
    errors?: TezosOperationError[]
}

class TezosMetadata {
    @Expose()
    @Type(()=>TezosOperationResult)
    operation_result?: TezosOperationResult
}

export class TezosContent {
    @Expose()
    @Type(()=>TezosMetadata)
    metadata: TezosMetadata
}

export class TezosOperation {
    @Expose({name: "hash"})
    hash: String
    @Expose({name: "contents"})
    @Type(()=>TezosContent)
    contents: TezosContent[]
}