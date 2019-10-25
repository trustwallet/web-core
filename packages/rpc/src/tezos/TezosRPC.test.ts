import axios from 'axios';
import { getEnv } from '../utils';
import { TezosRPC } from './TezosRPC';
import { Query } from './Query';

describe('TezosRPC', () => {
    let query: Query;
    let rpc: TezosRPC;

    // const testUrl = 'https://mainnet-node.tzscan.io';

    const contractId = 'tz1Sfe7Nm2MdmkCopA7DVBUHHEd8G73TWwfN';
    const block = 'BMDcrb57AumMTixxMkpQwVkuvxn5GxjSwLUWivoFUNzL271sH8U';

    beforeEach(function() {
        require('dotenv').config({ path: __dirname + '/./.env' });
        rpc = new TezosRPC(getEnv('TEZOS_RPC_URL'));
        query = new Query(getEnv('TEZOS_RPC_URL'));
        spyOn(axios, 'get').and.returnValue({ data: '' });
        spyOn(axios, 'post').and.returnValue({ data: '' });
    });

    it('Should get Account', async function() {
        await rpc.getAccount(contractId);
        const reqUrl = query.getAccount(contractId);
        expect(axios.get).toHaveBeenCalledWith(reqUrl);
    });

    it('Should get Head', async function() {
        await rpc.getHead();
        const reqUrl = query.getHead();
        expect(axios.get).toHaveBeenCalledWith(reqUrl);
    });

    it('Should get Block Operations', async function() {
        await rpc.getBlockOperations(block);
        const reqUrl = query.getBlockOperations(block);
        expect(axios.get).toHaveBeenCalledWith(reqUrl);
    });

    it('Should get Manager Key', async function() {
        await rpc.getManagerKey(contractId);
        const reqUrl = query.getManagerKey(contractId);
        expect(axios.get).toHaveBeenCalledWith(reqUrl);
    });

    it('Should Broadcast Transaction', async function() {
        const data =
            '{ "branch": "BLnfTrJ6zwakFL6LbBzrD2tRSQuVJ2YymAnNHsYqW9FqEQLEFHT","contents": [{ "kind": "transaction","source": "tz1VFgcWrcLvxpWcMvKnzFZpLjWxNT4wuosx","fee": "1","counter": "36904","gas_limit": "800000","storage_limit": "60000","amount": "1","destination": "tz1hBT7dx9aaiZTEsSJUnB8fKQ76EswyTLgZ" }],"signature":    "edsigtXomBKi5CTRf5cjATJWSyaRvhfYNHqSUGrn4SdbYRcGwQrUGjzEfQDTuqHhuA8b2d8NarZjz8TRf65WkpQmo423BtomS8Q"}';
        await rpc.broadcastTransaction(data);
        expect(axios.post).toHaveBeenCalled();
    });
});
