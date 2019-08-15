import * as BitcoinRPC from './index';
import { RPC } from './rpc';

describe('bitcoinRPC', () => {
    let BTC: RPC;
    let xpub: string;
    let address: string;
    let tx: string;
    beforeAll(() => {
        BTC = BitcoinRPC.BitcoinRPC('https://btc1.trezor.io');
        xpub =
            'xpub6CUGRUonZSQ4TWtTMmzXdrXDtypWKiKrhko4egpiMZbpiaQL2jkwSB1icqYh2cfDfVxdx4df189oLKnC5fSwqPfgyP3hooxujYzAu3fDVmz';
        address = '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX';
        tx = '372f2f8f815fdb885bc1e6c811c9a4cc9af769e5288f926d7b975e44b6f6cef6';
    });

    it('should get last block', async () => {
        expect(await BTC.getLatestBlock()).toBeTruthy();
    });

    it('should get balance', async () => {
        expect(await BTC.getBalance(xpub)).toBeTruthy();
    });

    it('should get listUnspent', async () => {
        expect((await BTC.listUnspent(xpub)).length).toBeTruthy();
    });

    it('should get listTransactions', async () => {
        expect((await BTC.listTransactions(address)).length).toBeTruthy();
    });

    it('should get tx detail', async () => {
        expect((await BTC.getTransactionDetail(tx)).txid).toBeTruthy();
    });

    it('should get estimated fee', async () => {
        expect(await BTC.estimateFee(10)).toBeTruthy();
    });

    it('should broadcast TX', async done => {
        /* Skip this test */
        done();
    });
});
