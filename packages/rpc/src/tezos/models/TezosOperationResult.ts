import 'reflect-metadata';
import { Type } from 'class-transformer';
import { TezosOperationError } from './TezosOperationError';

export class TezosOperationResult {
    status: string

    @Type(() => TezosOperationError)
    errors: TezosOperationError[]
}