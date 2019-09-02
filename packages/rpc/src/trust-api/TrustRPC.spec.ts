import { TrustRPC } from './TrustRPC';
import { CoinType } from '@trustwallet/types/lib/CoinType';
import { getEnv } from '../utils';

describe('TrustRPC', () => {
    let rpc: TrustRPC;
    const coin = CoinType.cosmos;

    beforeAll(() => {
        require('dotenv').config({ path: __dirname + '/./.env' });
        rpc = new TrustRPC(getEnv('TRUST_RPC_URL'));
    });

    it('should get Cosmos price', async () => {
        const price = await rpc.getPrices(coin, 'USD');
        expect(price.toNumber()).toBeGreaterThan(0);
    });
});
