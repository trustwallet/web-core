import { Utils } from './utils';
import BigNumber from 'bignumber.js';

describe('CosmosUtils', () => {
    it('should convert MicroAtom to Atom', () => {
        const micro = new BigNumber(1000000000);
        expect(Utils.toAtom(micro)).toEqual(micro.dividedBy(1000000));
    });

    it('should convert Atom to MicroAtom', () => {
        const atom = new BigNumber(1000000000);
        expect(Utils.fromAtom(atom)).toEqual(atom.multipliedBy(1000000));
    });
});
