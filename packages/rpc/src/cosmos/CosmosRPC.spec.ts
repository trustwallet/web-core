import { CosmosRPC } from './CosmosRPC';
import { getEnv } from '../utils';

describe('cosmosRPC', () => {
    let rpc: CosmosRPC;
    let address: string;
    let delegationAddress: string;

    beforeAll(() => {
        require('dotenv').config({ path: __dirname + '/./.env' });
        rpc = new CosmosRPC(getEnv('COSMOS_RPC_URL'));
        address = 'cosmos1lcgtmf3gkdq4cuelly6554znqqhsl6eqy4r3f5';
        delegationAddress = 'cosmos1vjrx0lks65yefnsz4xk92vugda2z25esym5ypp';
    });

    it('should get account', async () => {
        let account = await rpc.getAccount(address);
        expect(account.address).toBe(address);
    }, 100000);

    it('should list delegations', async () => {
        let delegations = await rpc.listDelegations(delegationAddress);
        expect(delegations.length).toBeTruthy();
    });

    it('should broadcast transaction', async () => {
        let data =
            '{"tx":{"memo":"","signatures":[{"pub_key":{"type":"tendermint\\/PubKeySecp256k1","value":"ApGCXwby9foj0IAqOYvmjI+Sd2qdGVdyI1h+CiIFY8xF"},"signature":"5je8nZG5k3Qel1LeJ8f0QAZjwaeRK5Uw\\/DOaPHE64MBCAqYYZCO5l\\/mkxLSzQyxJABk14m+gzCNpSNHiWQm84w=="}],"msg":[{"type":"cosmos-sdk\\/MsgSend","value":{"amount":[{"amount":"2241155","denom":"uatom"}],"from_address":"cosmos135qla4294zxarqhhgxsx0sw56yssa3z0f78pm0","to_address":"cosmos1suasadhn8wmueg93u6js8ala89azqwg6fswuln"}}],"type":"cosmos-sdk\\/MsgSend","fee":{"amount":[{"amount":"1000","denom":"uatom"}],"gas":"200000"}},"mode":"async"}';
        let result = await rpc.broadcastTransaction(data);
        expect(result.txhash).toBeDefined();
    });
});
