import BigNumber from 'bignumber.js';

export class TezosContract {
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    balance: BigNumber;
    
    counter: string;
}