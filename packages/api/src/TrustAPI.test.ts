import axios from 'axios';
import { TrustAPI } from './TrustAPI';
import { CoinType, FiatCoinType } from '@trustwallet/types';
import { Utils, getEnv } from './utils';

describe('TrustRPC', () => {
    let client: TrustAPI;
    const coin = CoinType.cosmos;

    beforeAll(() => {
        require('dotenv').config({ path: __dirname + '/./.env' });
        client = new TrustAPI(getEnv('TRUST_URL'));
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
