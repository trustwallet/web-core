import axios from 'axios';
import { getEnv } from '../utils';
import { BlockatlasRPC } from './BlockatlasRPC';

describe('BlockatlasRPC', () => {
    let rpc: BlockatlasRPC;
    const address = 'cosmos1lcgtmf3gkdq4cuelly6554znqqhsl6eqy4r3f5';

    beforeEach(function() {
        require('dotenv').config({ path: __dirname + '/./.env' });
        rpc = new BlockatlasRPC(getEnv('BLOCKATLAS_RPC_URL'), 'cosmos');
        spyOn(axios, 'get').and.returnValue({ data: '' });
        spyOn(axios, 'post').and.returnValue({ data: '' });
    });

    it('should list validators', async () => {
        const addToBeCalled = `${getEnv('BLOCKATLAS_RPC_URL')}/v2/cosmos/staking/validators`;
        await rpc.listValidators();
        expect(axios.get).toHaveBeenCalledWith(addToBeCalled);
    });

    it('should list delegations', async () => {
        await rpc.listTransactions(address);
        const addToBeCalled = `${getEnv('BLOCKATLAS_RPC_URL')}/v2/cosmos/transactions/${address}`;
        expect(axios.get).toHaveBeenCalledWith(addToBeCalled);
    });
});
