import BigNumber from 'bignumber.js';

export class Utils {
    static toTron(microtron: BigNumber): BigNumber {
        const denominator = new BigNumber(1000000);
        return microtron.dividedBy(denominator);
    }

    static fromTron(tron: BigNumber): BigNumber {
        const denominator = new BigNumber(1000000);
        return tron.multipliedBy(denominator);
    }
}
