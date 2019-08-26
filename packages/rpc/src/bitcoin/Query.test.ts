import { Query } from './Query';
import { BitcoinFeePriority } from './models/BitcoinFeePriority';

describe('BitcoinQuery', () => {
    const baseUrl = 'https://btc1.trezor.io/api';
    const query = new Query(baseUrl);

    it('should return a correct path', async () => {
        expect(query.getLatestBlock()).toBe(baseUrl + '/v2/');
        expect(query.getBalance('xpub123')).toContain('/v2/xpub/');
        expect(query.listUnspent('xpub123')).toContain('/v2/utxo/');
        expect(query.listTransactions('btc123')).toContain('/v2/address/');
        expect(query.getTransactionDetail('tx123')).toContain('/v2/tx/');
        expect(query.estimateFee(BitcoinFeePriority.FASTEST)).toBe(baseUrl + '/v2/estimatefee/2');
        expect(query.broadcastTransaction()).toBe(baseUrl + '/v2/sendtx/');
    });
});
