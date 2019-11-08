import axios from 'axios';
import { WavesRPC } from './WavesRPC';
import { getEnv } from '../utils';
import { Query } from './Query';

describe('WavesRPC', () => {
    let rpc: WavesRPC;
    let query: Query;
    const address = '3P8mkuJyiFvVRLjVNfDvdqVqH92bZZkQtAL';
    const txID = '9XW4QRqXW7tAzMnTCkGDsXi5pQQviJbwNiwtPCxUZs4X';

    beforeEach(() => {
        require('dotenv').config({ path: __dirname + '/./.env' });
        rpc = new WavesRPC(getEnv('WAVES_RPC_URL'));
        query = new Query(getEnv('WAVES_RPC_URL'));
    });

    it('should get height', async () => {
        spyOn(axios, 'get').and.returnValue({ data: '' });
        await rpc.getCurrentHeight();
        const reqUrl = query.getCurrentHeight();
        expect(axios.get).toHaveBeenCalledWith(reqUrl);
    });

    it('should get adress balance', async () => {
        spyOn(axios, 'get').and.returnValue({ data: '' });
        await rpc.getAddress(address);
        const reqUrl = query.getAddress(address);
        expect(axios.get).toHaveBeenCalledWith(reqUrl);
    });

    it('should get transaction by id', async () => {
        spyOn(axios, 'get').and.returnValue({ data: '' });
        await rpc.getTransaction(txID);
        const reqUrl = query.getTransaction(txID);
        expect(axios.get).toHaveBeenCalledWith(reqUrl);
    });

    it('should get all active leases for an address', async () => {
        spyOn(axios, 'get').and.returnValue({ data: '' });
        await rpc.getActiveLeasings(address);
        const reqUrl = query.getActiveLeasings(address);
        expect(axios.get).toHaveBeenCalledWith(reqUrl);
    });

    it('should get broadcast transaction', async () => {
        spyOn(axios, 'post').and.returnValue({ data: '' });
        const transaction =
            '{"senderPublicKey":"8f9MUt5QXBBC11Yu4LcfWSdgdUSZBbvXATDfykQymmLe","amount":100000,"sender":"3P8mkuJyiFvVRLjVNfDvdqVqH92bZZkQtAL","feeAssetId":null,"proofs":["5XtxTCxa1gKAiCgmdKN6cnydCoCsHYJ9htfrN8h4HcuMS2aWWTVdyMVhy9jc737Ww7UAMvBsSMd1hgcGcwvdpKdX"],"fee":100000,"recipient":"3P9DEDP5VbyXQyKtXDUt2crRPn5B7gs6ujc","id":"DKhmXrCsBwf6WVhGh8bYVBnjtAXGpk2K4Yd3CW4u1huG","type":8,"version":2,"timestamp":1588973547102,"height":1714548}';
        await rpc.broadcastTransaction(transaction);
        const reqUrl = query.broadcastTransaction();
        expect(axios.post).toHaveBeenCalledWith(reqUrl, transaction);
    });
});
