import { TrustClient } from './TrustClient';
import { CoinType } from '@trustwallet/types/lib/CoinType';
import { FiatCoinType } from '@trustwallet/types/lib/FiatCoinType';
import { getEnv } from '../utils';

describe('TrustRPC', () => {
    let client: TrustClient;
    const coin = CoinType.cosmos;

    beforeAll(() => {
        require('dotenv').config({ path: __dirname + '/./.env' });
        client = new TrustClient(getEnv('TRUST_URL'));
    });

    it('should get Cosmos price', async () => {
        const price = await client.getPrices(coin, FiatCoinType.USD);
        expect(price.toNumber()).toBeGreaterThan(0);
    });
});
