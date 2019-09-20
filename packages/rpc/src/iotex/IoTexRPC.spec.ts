import { IoTexRPC } from './IoTexRPC';
import { getEnv } from '../utils';

describe('IotexRPC', () => {
    let rpc: IoTexRPC;
    let address: string;
    let hash: string;

    beforeAll(() => {
        require('dotenv').config({ path: __dirname + '/../.env' });
        rpc = new IoTexRPC(getEnv('IOTEX_RPC_URL'));
        address = 'io1juvx5g063eu4ts832nukp4vgcwk2gnc5cu9ayd';
        hash = '42a00398213168b143714a26ba135f81c262bf9546c1d9f3e1c47385ec4a7379';
    });

    it('should get account', async () => {
        let account = await rpc.getAccount(address);
        expect(account.accountMeta.address).toBe(address);
    }, 100000);

    it('should get transaction by hash', async () => {
        let transaction = await rpc.getTransactionByHash(hash);
        expect(transaction.actionInfo[0].actHash).toBe(hash);
    });

    it('should broadcast transaction', async () => {
        let data =
            '0a560801101918904e220d31303030303030303030303030523e0a1131303030303030303030303030303030301229696f3165326e7173797437666b707a733578377a6632756b306a6a3732746575356e36616b75337472124104b8606ce19d9f2ee2373c877bd6b1a792964dbf2c309cda77bf3e6dce5c4d844052a54d17a8a0cb9b7dcf68ea3366677a2c35eddeb14a06e891c0e7551c66b8cf1a41eb5723d90058c3ba34e16fb9426c7892bc3224e3edcaca844f35f3e1cd0154da63d797a507b08c17f609b138174cb6741b83043bc599d8aba669d1594d94bc3c00';
        let result = await rpc.broadcastTransaction(data);
        expect(result).toBeDefined();
    });
});
