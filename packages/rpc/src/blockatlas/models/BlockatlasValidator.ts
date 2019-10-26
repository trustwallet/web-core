import { Transform, Type } from 'class-transformer';
import { BlockatlasResult } from './BlockatlasResult';

class Info {
    name: string;
    description: string;
    image: string;
    website: string;
}

class Reward {
    annual?: number;
}

export enum BlockatlasStakingType {
    AUTO,
    DELEGATE,
}

export class BlockatlasStakingDetails {
    @Type(() => Reward)
    reward: Reward;
    lockTime: number;
    minimumAmount: string;
    @Transform(status => {
        switch (status) {
            case "auto":
                return BlockatlasStakingType.AUTO;
            case "delegate":
                return BlockatlasStakingType.DELEGATE;
            default:
                return BlockatlasStakingType.DELEGATE;
        }
    })
    type: BlockatlasStakingType;
}

export class BlockatlasValidator {
    id: string;
    status: boolean;
    @Type(() => Info)
    info: Info;

    @Type(() => BlockatlasStakingDetails)
    details: BlockatlasStakingDetails;
}

export class BlockatlasValidatorResult extends BlockatlasResult {
    @Type(() => BlockatlasValidator)
    docs: BlockatlasValidator[];
}
