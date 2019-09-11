import { Expose, Transform } from 'class-transformer';

interface TimeFrame {
    day: number;
    hour: number;
    minute: number;
    seconds: number;
}

export class CosmosStakingInfo {
    @Transform(
        (milliseconds: string): TimeFrame => {
            const mills = parseInt(milliseconds) / 1000000;
            let seconds = Math.floor(mills / 1000);
            let minute = Math.floor(seconds / 60);
            seconds = seconds % 60;
            let hour = Math.floor(minute / 60);
            minute = minute % 60;
            let day = Math.floor(hour / 24);
            hour = hour % 24;
            return {
                day,
                hour,
                minute,
                seconds,
            };
        },
        { toClassOnly: true },
    )
    @Expose({ name: 'unbonding_time' })
    timeFrame: TimeFrame;

    @Expose({ name: 'max_validators' })
    maxValidators: number;

    @Expose({ name: 'max_entries' })
    maxEntries: number;

    @Expose({ name: 'bond_denom' })
    bondDenom: string;
}
