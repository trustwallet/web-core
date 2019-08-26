import { Type } from 'class-transformer';
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

export class BlockatlasValidator {
    id: string;
    status: boolean;
    @Type(() => Info)
    info: Info;
    @Type(() => Reward)
    reward: Reward;
}

export class BlockatlasValidatorResult extends BlockatlasResult {
    @Type(() => BlockatlasValidator)
    docs: BlockatlasValidator[];
}
