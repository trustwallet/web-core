import BigNumber from 'bignumber.js';
import { Transform } from 'class-transformer';

export class TezosBlockHeader {
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    level: BigNumber;
    proto: number;
    predecessor: string;
    timestamp: string;
    validation_pass: number;
    operations_hash: string;
    fitness: number[];
    context: string;
    priority: number;
    proof_of_work_nonce: string;
    signature: string;
}
