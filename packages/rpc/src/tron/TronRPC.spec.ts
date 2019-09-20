import { TronRPC } from './TronRPC';
import { getEnv } from '../utils';

describe('TronRPC', () => {
    let rpc: TronRPC;
    const delegator = 'TKYT8YiiL58h8USHkmVEhCYpNfgSyiWPcW';
    const txID = '46cde30f74164c6fc906f4d8c195823431631cf06658b6e3782b82504d58d077';

    beforeEach(() => {
        require('dotenv').config({ path: __dirname + '/./.env' });
        rpc = new TronRPC(getEnv('TRON_RPC_URL'));
    });

    it('should get now block', async () => {
        const block = await rpc.getNowBlock();
        expect(block.blockHeader).toBeDefined();
    });

    it('should get account', async () => {
        const account = await rpc.getAccount(delegator);
        expect(account.address).toBe(delegator);
    });

    it('should get votes', async () => {
        const delegations = await rpc.listDelegations(delegator);
        expect(delegations.length).toBeGreaterThan(0);
    });

    it('should get frozen', async () => {
        const frozen = await rpc.listFrozen(delegator);
        expect(frozen.length).toBeGreaterThan(0);
    });

    it('should get transaction by id', async () => {
        const transaction = await rpc.getTransaction(txID);
        expect(transaction.txID).toBe(txID);
    });

    it('should get broadcast transaction', async () => {
        const transaction =
            '{"raw_data":{"contract":[{"parameter":{"type_url":"type.googleapis.com/protocol.TransferAssetContract","value":{"amount":4,"asset_name":"31303030393539","owner_address":"415cd0fb0ab3ce40f3051414c604b27756e69e43db","to_address":"41521ea197907927725ef36d70f25f850d1659c7c7"}},"type":"TransferAssetContract"}],"expiration":1541926116000,"ref_block_bytes":"b801","ref_block_hash":"0e2bc08d550f5f58","timestamp":1539295479000},"signature":["77f5eabde31e739d34a66914540f1756981dc7d782c9656f5e14e53b59a15371603a183aa12124adeee7991bf55acc8e488a6ca04fb393b1a8ac16610eeafdfc00"],"txID":"546a3d07164c624809cf4e564a083a7a7974bb3c4eff6bb3e278b0ca21083fcb"}';
        const result = await rpc.broadcastTransaction(transaction);
        expect(result.result).toBeFalsy();
    });
});
