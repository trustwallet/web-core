import { BlockatlasRPC } from './BlockatlasRPC';

describe('blockatlas', () => {
    let rpc: BlockatlasRPC;
    beforeAll(() => {
        rpc = new BlockatlasRPC('http://blockatlas.trustwalletapp.com', 'cosmos');
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
