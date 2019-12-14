import { Type } from "class-transformer";
import { CosmosAmount } from "./CosmosAmount";

export class CosmosReward {
    validator_address: string;

    @Type(() => CosmosAmount)
    reward: CosmosAmount[];
}

export class CosmosRewards {
    @Type(() => CosmosReward)
    rewards: CosmosReward[];

    @Type(() => CosmosAmount)
    total: CosmosAmount[];
}

export class CosmosRewardsResult {
    @Type(() => CosmosReward)
    result: CosmosRewards;
}
