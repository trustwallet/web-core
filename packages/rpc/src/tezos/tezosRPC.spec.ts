import { TezosRPC } from './tezosRPC';
import { getEnv } from '../utils';

describe('TezosRPC', () => {
    let rpc: TezosRPC;
    let address: string;
    let block: string;

    beforeAll(() => {
        require('dotenv').config({ path: __dirname + '/../.env' });
        rpc = new TezosRPC(getEnv('TEZOS_RPC_URL'));
        address = 'tz1P8dyDKVKHe3NhbVw1gSa2NLPAoymJJMoR';
        block = "BLUXLWbx7vPv9FUGcyVrSDU2iQ5C51dm98iEy5YDzRHknAFwa3K";
    });

    it('should get head', async () => {
        try {
            let head = await rpc.getHead();
            expect(head.hash).toBeDefined();
            expect(head.header.level).toBeDefined();
        } catch (error) {
            console.log("error in test get head >> ", error)
        }
    }, 100000)

    it('should get account', async () => {
        try {
            let account = await rpc.getAccount(address);
            expect(account.balance).toBeDefined();
            expect(account.counter).toBeDefined();
        } catch (error) {
            console.log("error in test get account >> ", error)
        }
    })

    it('should get managed keys', async () => {
        try {
            let keys = await rpc.manageKey(address);
            expect(keys.key).toBeDefined();
        } catch (error) {
            console.log("error in test get managed keys >> ", error)
        }
    })

    it('should get block operations', async () => {
        try {
         const blockOperation =   await rpc.getBlockOperations(block);
         expect(blockOperation).toBeTruthy();
        } catch (error) {
            console.log("error in test get block operations >> ", error)
        }
    })

    it('should broadcast transaction', async () => {
        let data =
            `8430d7ef052a057c53d34213e4be570a7395b9b8627333a60dd1fcc4ef51720a080000265178f1e949c5e78be7c9ed336ac032517f50360abfbe75c8010001000093cf58e68a4e36d51ae52f339fdbd0cab4e9db92004bdf2e7a0eda643437925be5da7a267ca5684f640125073d6dce734c12e5ae9e7e3de18d708e096e918104177cf6baf92c300f58a38eac612f5f8d514e3c1700`;
        let result = await rpc.broadcastTransaction(data);
        expect(result.error).toBeFalsy();
    });

});
