import Utils from './utils';
import { CoinType } from '@trustwallet/types/lib/CoinType';

describe('Trust', () => {
    it('should format address based in coin id', () => {
        expect(Utils.coinToAddress(CoinType.cosmos)).toEqual('0x0000000000000000000000000000000000000076');
    });
});
