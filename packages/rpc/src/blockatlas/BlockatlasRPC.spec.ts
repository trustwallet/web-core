import { BlockatlasRPC } from './BlockatlasRPC';
import { getEnv } from '../utils';
import { CoinType } from '@trustwallet/types';

describe('blockatlas', () => {
    let rpc: BlockatlasRPC;
    beforeAll(() => {
        require('dotenv').config({ path: __dirname + '/../.env' });
        rpc = new BlockatlasRPC(getEnv('BLOCKATLAS_RPC_URL'));
    });

    it('should list validators', async () => {
        let result = await rpc.listValidators(CoinType.cosmos);
        expect(result.docs.length).toBeGreaterThan(0);
    });

    it('should list transactions', async () => {
        let result = await rpc.listTransactions(CoinType.cosmos,'cosmos1lcgtmf3gkdq4cuelly6554znqqhsl6eqy4r3f5');
        expect(result.docs.length).toBeGreaterThan(0);
    });

    it('should list delegations', async () => {
        let result = await rpc.listDelegations(CoinType.cosmos,'cosmos135qla4294zxarqhhgxsx0sw56yssa3z0f78pm0');
        expect(result.docs.length).toBeGreaterThan(0);
    });

    it('should list delegations batch', async () => {
        const request = [
            { coin: CoinType.cosmos, address: 'cosmos135qla4294zxarqhhgxsx0sw56yssa3z0f78pm0' }
        ];

        let result = await rpc.listDelegationsBatch(request);
        expect(result.docs.length).toBeGreaterThan(0);
    });
});
