import { TrustAPI } from './TrustAPI';
import { CoinType, FiatCoinType } from '@trustwallet/types';
import { getEnv } from './utils';

describe('TrustRPC', () => {
    let client: TrustAPI;
    const coin = CoinType.cosmos;

    beforeAll(() => {
        require('dotenv').config({ path: __dirname + '/./.env' });
        client = new TrustAPI(getEnv('TRUST_URL'));
    });

    it('should get Cosmos price', async () => {
        const price = await client.getPrices(coin, FiatCoinType.USD);
        expect(price.toNumber()).toBeGreaterThan(0);
    });
});
