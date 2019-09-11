import { Expose, Transform, Type } from 'class-transformer';
import BigNumber from 'bignumber.js';
import { Utils } from '../utils';

class CosmosUnbondEntry {
    @Expose({ name: 'creation_height' })
    creationHeight: string;

    @Type(() => Date)
    @Expose({ name: 'completion_time' })
    completionTime: Date;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    @Expose({ name: 'initial_balance' })
    initialBalance: BigNumber;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    balance: BigNumber;
}

export class CosmosUnbond {
    delegator_address: string;
    validator_address: string;

    @Type(() => CosmosUnbondEntry)
    entries: CosmosUnbondEntry[];

    getPending(): CosmosUnbondEntry[] {
        return this.entries.filter(entry => entry.completionTime.getTime() > Date.now());
    }

    getReleaseDate(): Date {
        return new Date(this.entries.reduce((prev, entry) => Math.max(entry.completionTime.getTime(), prev), 0));
    }

    getPendingBalance(): BigNumber {
        return Utils.toAtom(this.getPending().reduce((acc, entry) => acc.plus(entry.balance), new BigNumber(0)));
    }
}
