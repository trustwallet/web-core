import axios from 'axios';
import { TrustClient } from './TrustClient';
import { CoinType } from '@trustwallet/types/lib/CoinType';
import { FiatCoinType } from '@trustwallet/types/lib/FiatCoinType';
import { getEnv } from '../utils';
import Utils from '@trustwallet/api';

describe('TrustRPC', () => {
    let client: TrustClient;
    const coin = CoinType.cosmos;

    beforeAll(() => {
        require('dotenv').config({ path: __dirname + '/./.env' });
        client = new TrustClient(getEnv('TRUST_URL'));
    });

    beforeEach(function() {
        spyOn(axios, 'get').and.returnValue({ data: { backend: {} } });
        spyOn(axios, 'post').and.returnValue({ data: { docs: [], price: '1' } });
    });

    it('should get Cosmos price', async () => {
        const addrToBeCalled = `${getEnv('TRUST_URL')}/prices`;
        await client.getPrices(coin, FiatCoinType.USD);
        expect(axios.post).toHaveBeenCalledWith(addrToBeCalled, {
            currency: FiatCoinType.USD,
            tokens: [
                {
                    contract: Utils.coinToAddress(coin),
                },
            ],
        });
    });
});
