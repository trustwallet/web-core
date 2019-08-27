import { Query } from './Query';

describe('BitcoinQuery', () => {
    const baseUrl = 'https://eth1.trezor.io/api';
    const query = new Query(baseUrl);

    it('should return a correct path', async () => {
        expect(query.getLatestBlock()).toBe(baseUrl + '/v2/');
        expect(query.getBalance('xpub123')).toContain('/v2/xpub/');
        expect(query.getTransactionDetail('tx123')).toContain('/v2/tx/');
        expect(query.broadcastTransaction()).toBe(baseUrl + '/v2/sendtx/');
        expect(query.getBlock(100)).toContain(baseUrl + '/v2/block/');
        expect(query.addressInfo('xpub123')).toContain(baseUrl + '/v2/address/');
    });
});
