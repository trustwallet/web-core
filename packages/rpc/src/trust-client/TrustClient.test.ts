import axios from 'axios';
import { TrustClient } from './TrustClient';
import { CoinType } from '@trustwallet/types/lib/CoinType';
import { getEnv } from '../utils';
import Utils from '@trustwallet/api';

describe('TrustRPC', () => {
    let rpc: TrustClient;
    const coin = CoinType.cosmos;

    beforeAll(() => {
        require('dotenv').config({ path: __dirname + '/./.env' });
        rpc = new TrustClient(getEnv('TRUST_RPC_URL'));
    });

    beforeEach(function() {
        spyOn(axios, 'get').and.returnValue({ data: { backend: {} } });
        spyOn(axios, 'post').and.returnValue({ data: { docs: [], price: '1' } });
    });

    it('should get Cosmos price', async () => {
        const currency = 'USD';
        const addrToBeCalled = `${getEnv('TRUST_RPC_URL')}/prices`;
        await rpc.getPrices(coin, 'USD');
        expect(axios.post).toHaveBeenCalledWith(addrToBeCalled, {
            currency,
            tokens: [
                {
                    contract: Utils.coinToAddress(coin),
                },
            ],
        });
    });
});
