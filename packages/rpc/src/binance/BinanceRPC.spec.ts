import { getEnv } from '../utils';
import { BinanceRPC } from './BinanceRPC';

describe('BinanceRPC', () => {
    let rpc: BinanceRPC;
    let address: string;
    let binanceRpcUrl: string;
    let order: string;
    let symbol: string;
    let transactionHash: string;
    let sync: string;

    beforeEach(function() {
        require('dotenv').config({ path: __dirname + '/../.env' });
        binanceRpcUrl = getEnv('BINANCE_RPC_URL');
        rpc = new BinanceRPC(binanceRpcUrl);
        address = 'bnb1qfmufc2q30cgw82ykjlpfeyauhcf5mad6p5y8t';
        order = 'open';
        symbol = 'MTV-4C6_BNB';
        transactionHash = '430514BE4AA35A6334244147E8EFA35C699BF49EA80BCBA1D8750281AD56E5A8';
        sync = '';
    });

    it('Should get Account', async function() {
        const account = await rpc.getAccount(address);
        expect(account.address).toBe(address);
    });

    it('Should get Market', async function() {
        const markets = await rpc.getMarket();
        expect(markets).toBeTruthy();
    });

    it('Should get Node Info', async function() {
        const nodeInfo = await rpc.getNodeInfo();
        expect(nodeInfo.chainID()).toBeTruthy();
    });

    it('Should get Order Info', async function() {
        const orderInfo = await rpc.getOrder(order, address, symbol);
        expect(orderInfo.order).toBeTruthy();
        expect(orderInfo.total).toBeDefined();
    });

    it('Should get Transaction Info', async function() {
        const TransactionInfo = await rpc.getTransaction(transactionHash);
        expect(TransactionInfo.hash).toBe(transactionHash);
        expect(TransactionInfo.ok).toBeTruthy();
        expect(TransactionInfo.tx).toBeTruthy();
    });

    it('Should Broadcast Transaction', async function() {
        const data =
            'F79C11B8682AC05A0532D355E5EE7AA5865D0D8DE0AE5D567A77BAF82988174708000002298c03ed7d454a101eb7022bc95f7e5f41ac78d0860303c8010080c2d72f0000e7670f32038107a59a2b9cfefae36ea21f5aa63c00eff5b0ce828237f10bab4042a891d89e951de2c5ad4a8fa72e9514ee63fec9694a772b563bcac8ae0d332d57f24eae7d4a6fad784a8436b6ba03d05bf72e4408';
        const result = await rpc.broadcastTransaction(data, sync);
        expect(result[0].hash).toBeDefined();
    }, 10000);
});
