import { Transform } from 'class-transformer';
import BigNumber from 'bignumber.js';

export class CosmosReward {
    denom: string;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    amount: BigNumber;
}
