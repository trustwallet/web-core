import { WavesRPC } from './WavesRPC';
import { getEnv } from '../utils';

describe('WavesRPC', () => {
    let rpc: WavesRPC;
    const leaser = '3P8mkuJyiFvVRLjVNfDvdqVqH92bZZkQtAL';
    const txID = '9XW4QRqXW7tAzMnTCkGDsXi5pQQviJbwNiwtPCxUZs4X';

    beforeEach(() => {
        require('dotenv').config({ path: __dirname + '/./.env' });
        rpc = new WavesRPC(getEnv('WAVES_RPC_URL'));
    });

    it('should get height', async () => {
        const height = await rpc.getCurrentHeight();
        expect(height.height).toBeGreaterThan(0);
    });

    it('should get address waves balance', async () => {
        const address = await rpc.getAddress(leaser);
        expect(address.address).toBe(leaser);
    });

    it('should get transaction by id', async () => {
        const transaction = await rpc.getTransaction(txID);
        expect(transaction.txID).toBe(txID);
    });

    it('should get all active leases for an address', async () => {
        const leasetxs = await rpc.getActiveLeasings(leaser);
        expect(leasetxs.length).toBeTruthy();
    });

    it('should get broadcast transaction', async () => {
        const transaction =
            '{"senderPublicKey":"8f9MUt5QXBBC11Yu4LcfWSdgdUSZBbvXATDfykQymmLe","amount":100000,"sender":"3P8mkuJyiFvVRLjVNfDvdqVqH92bZZkQtAL","feeAssetId":null,"proofs":["5XtxTCxa1gKAiCgmdKN6cnydCoCsHYJ9htfrN8h4HcuMS2aWWTVdyMVhy9jc737Ww7UAMvBsSMd1hgcGcwvdpKdX"],"fee":100000,"recipient":"3P9DEDP5VbyXQyKtXDUt2crRPn5B7gs6ujc","id":"DKhmXrCsBwf6WVhGh8bYVBnjtAXGpk2K4Yd3CW4u1huG","type":8,"version":2,"timestamp":1588973547102,"height":1714548}';
        const result = await rpc.broadcastTransaction(transaction);
        expect(result.result).toBeFalsy();
    });
});
