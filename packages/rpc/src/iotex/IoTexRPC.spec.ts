import {IoTexRPC} from "./IoTexRPC";
import { getEnv } from '../utils';


describe('iotexRPC', () => {
    let rpc: IoTexRPC;
    let address: string;
    let hash: string;


    beforeAll(() => {
        require('dotenv').config({ path: __dirname + '/./.env' });
        rpc = new IoTexRPC(getEnv("COSMOS_RPC_URL"));
        address = 'io1juvx5g063eu4ts832nukp4vgcwk2gnc5cu9ayd';
        hash = '42a00398213168b143714a26ba135f81c262bf9546c1d9f3e1c47385ec4a7379'
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
        let data ="";
        let result = await rpc.broadcastTransaction(data);
        expect(result.receiptInfo).toBeDefined();
    });
});
