import { BlockatlasValidator } from './BlockatlasValidator';
import BigNumber from 'bignumber.js';
import { Transform, Type } from 'class-transformer';
import { BlockatlasResult } from './BlockatlasResult';

export class BlockatlasDelegation {
    @Type(() => BlockatlasValidator)
    delegator: BlockatlasValidator;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    value: BigNumber;
    status: string;
    metadata: any;
}

export class BlockatlasDelegationResult extends BlockatlasResult {
    @Type(() => BlockatlasDelegation)
    docs: BlockatlasDelegation[];
}
