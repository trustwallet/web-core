import { BlockatlasRPC } from './BlockatlasRPC';
import { getEnv } from '../utils';

describe('blockatlas', () => {
    let rpc: BlockatlasRPC;
    beforeAll(() => {
        require('dotenv').config({ path: __dirname + '/../.env' });
        rpc = new BlockatlasRPC(getEnv('BLOCKATLAS_RPC_URL'), 'cosmos');
    });

    it('should list validators', async () => {
        let result = await rpc.listValidators();
        expect(result.docs.length).toBeGreaterThan(0);
    });

    it('should list transactions', async () => {
        let result = await rpc.listTransactions('cosmos1lcgtmf3gkdq4cuelly6554znqqhsl6eqy4r3f5');
        expect(result.docs.length).toBeGreaterThan(0);
    });
});
