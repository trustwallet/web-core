import BigNumber from 'bignumber.js';
import { Transform, Expose } from 'class-transformer';

export class TezosBlockHeader {
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    level: BigNumber;
    proto: number;
    predecessor: string;
    timestamp: string;
    @Expose({ name: 'validation_pass' })
    validationPass: number;
    @Expose({ name: 'operations_hash' })
    operationsHash: string;
    fitness: number[];
    context: string;
    priority: number;
    @Expose({ name: 'proof_of_work_nonce' })
    proofOfWorkNonce: string;
    signature: string;
}
