import axios from 'axios';
import { getEnv } from '../utils';
import { BlockatlasRPC } from './BlockatlasRPC';
import { CoinType } from '@trustwallet/types';

describe('BlockatlasRPC', () => {
    let rpc: BlockatlasRPC;
    const address = 'cosmos1lcgtmf3gkdq4cuelly6554znqqhsl6eqy4r3f5';

    beforeEach(function() {
        require('dotenv').config({ path: __dirname + '/./.env' });
        rpc = new BlockatlasRPC(getEnv('BLOCKATLAS_RPC_URL'));
        spyOn(axios, 'get').and.returnValue({ data: '' });
        spyOn(axios, 'post').and.returnValue({ data: '' });
    });

    it('should list validators', async () => {
        const addToBeCalled = `${getEnv('BLOCKATLAS_RPC_URL')}/v2/cosmos/staking/validators`;
        await rpc.listValidators(CoinType.cosmos);
        expect(axios.get).toHaveBeenCalledWith(addToBeCalled);
    });

    it('should list transactions', async () => {
        await rpc.listTransactions(CoinType.cosmos, address);
        const addToBeCalled = `${getEnv('BLOCKATLAS_RPC_URL')}/v2/cosmos/transactions/${address}`;
        expect(axios.get).toHaveBeenCalledWith(addToBeCalled);
    });

    it('should list delegations', async () => {
        await rpc.listDelegations(CoinType.cosmos, address);
        const addToBeCalled = `${getEnv('BLOCKATLAS_RPC_URL')}/v2/cosmos/staking/delegations/${address}`;
        expect(axios.get).toHaveBeenCalledWith(addToBeCalled);
    });

    it('should list delegations batch', async () => {
        const request = [ { coin: CoinType.cosmos, address }];
        await rpc.listDelegationsBatch(request);
        const addToBeCalled = `${getEnv('BLOCKATLAS_RPC_URL')}/v2/staking/delegations`;
        expect(axios.post).toHaveBeenCalledWith(addToBeCalled, request);
    });
});
