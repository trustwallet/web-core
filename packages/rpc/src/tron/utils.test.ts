import { Utils } from './utils';
import BigNumber from 'bignumber.js';

describe('TronUtils', () => {
    it('should convert MicroTron to Tron', () => {
        const micro = new BigNumber(1000000000);
        expect(Utils.toTron(micro)).toEqual(micro.dividedBy(1000000));
    });

    it('should convert Tron to MicroTron', () => {
        const tron = new BigNumber(1000000000);
        expect(Utils.fromTron(tron)).toEqual(tron.multipliedBy(1000000));
    });
});
