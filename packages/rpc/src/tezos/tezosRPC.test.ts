import axios from 'axios';
import { getEnv } from '../utils';
import { TezosRPC } from './tezosRPC';

describe('TezosRPC', () => {
    let rpc: TezosRPC;
    const address = 'tz1P8dyDKVKHe3NhbVw1gSa2NLPAoymJJMoR';
    const block = "1"

    beforeEach(function() {
        require('dotenv').config({ path: __dirname + '/../.env' });
        rpc = new TezosRPC(getEnv('TEZOS_RPC_URL'));
        spyOn(axios, 'get').and.returnValue({ data: '' });
        spyOn(axios, 'post').and.returnValue({ data: '' });
    });

    it('should get head', async () => {
        try {
            const addToBeCalled = `${getEnv('TEZOS_RPC_URL')}/chains/main/blocks/head`;
            await rpc.getHead();
            expect(axios.get).toHaveBeenCalledWith(addToBeCalled);
        } catch (error) {
            console.log("error in test get head >> ", error)
        }
    })

    it('should get account', async () => {
        try {
            const addToBeCalled = `${getEnv('TEZOS_RPC_URL')}/chains/main/blocks/head/context/contracts/${address}`;
            await rpc.getAccount(address);
            expect(axios.get).toHaveBeenCalledWith(addToBeCalled);
        } catch (error) {
            console.log("error in test get account >> ", error)
        }
    })

    it('should get block operations', async () => {
        try {
            const addToBeCalled = `${getEnv('TEZOS_RPC_URL')}/chains/main/blocks/${block}/operations`;
            await rpc.getBlockOperations(block);
            expect(axios.get).toHaveBeenCalledWith(addToBeCalled);
        } catch (error) {
            console.log("error in test get block operations >> ", error)
        }
    })
    
    it('should get managed keys', async () => {
        try {
            const addToBeCalled = `${getEnv('TEZOS_RPC_URL')}/chains/main/blocks/head/context/contracts/${address}/manager_key`;
            await rpc.manageKey(address);
            expect(axios.get).toHaveBeenCalledWith(addToBeCalled);
        } catch (error) {
            console.log("error in test get managed keys >> ", error)
        }
    })
    

    it('should broadcast transaction', async () => {
        try {
            const data =
                '{"tx":{"memo":"","signatures":[{"pub_key":{"type":"tendermint\\/PubKeySecp256k1","value":"ApGCXwby9foj0IAqOYvmjI+Sd2qdGVdyI1h+CiIFY8xF"},"signature":"5je8nZG5k3Qel1LeJ8f0QAZjwaeRK5Uw\\/DOaPHE64MBCAqYYZCO5l\\/mkxLSzQyxJABk14m+gzCNpSNHiWQm84w=="}],"msg":[{"type":"cosmos-sdk\\/MsgSend","value":{"amount":[{"amount":"2241155","denom":"uatom"}],"from_address":"cosmos135qla4294zxarqhhgxsx0sw56yssa3z0f78pm0","to_address":"cosmos1suasadhn8wmueg93u6js8ala89azqwg6fswuln"}}],"type":"cosmos-sdk\\/MsgSend","fee":{"amount":[{"amount":"1000","denom":"uatom"}],"gas":"200000"}},"mode":"async"}';
            await rpc.broadcastTransaction(data);
            expect(axios.post).toHaveBeenCalled();
        } catch (error) {
            console.log("error in broadcast transaction >> ", error)
        }
    });
});
