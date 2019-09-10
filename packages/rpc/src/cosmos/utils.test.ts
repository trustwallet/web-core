import { Utils } from './utils';
import BigNumber from 'bignumber.js';

describe('CosmosUtils', () => {
    it('should convert MicroAtom to Atom', () => {
        const micro = new BigNumber(1000000000);
        expect(Utils.toAtom(micro)).toEqual(micro.dividedBy(1000000));
    });
});
