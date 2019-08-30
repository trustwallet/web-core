import { QueryBuilder } from './Query';
import axios from 'axios';
import { getEnv } from '../utils';

describe('BitcoinQuery', () => {
    let query: QueryBuilder;

    beforeEach(function() {
        require('dotenv').config({ path: __dirname + '/./.env' });
        query = new QueryBuilder(getEnv('GETH_RPC_URL'));
        spyOn(axios, 'post').and.returnValue({ data: '' });
    });

    it('should scheduleGetLatestBlock', async () => {
        await query.scheduleGetLatestBlock().execute();
        expect(axios.post).toHaveBeenCalledWith(getEnv('GETH_RPC_URL'), {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_blockNumber',
            params: [],
        });
    });

    it('should scheduleBroadcastTransaction', async () => {
        const data = 'data';
        await query.scheduleBroadcastTransaction(data).execute();
        expect(axios.post).toHaveBeenCalledWith(getEnv('GETH_RPC_URL'), {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_sendRawTransaction',
            params: [data],
        });
    });

    it('should scheduleEstimateGasLimit', async () => {
        const from = 'from';
        const to = 'to';
        const value = 111;
        const gasPrice = 22;
        const data = 'data';
        await query.scheduleEstimateGasLimit(from, to, value, gasPrice, data).execute();
        expect(axios.post).toHaveBeenCalledWith(getEnv('GETH_RPC_URL'), {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_estimateGas',
            params: [
                { from, to, value: `0x${value.toString(16)}`, gasPrice: `0x${gasPrice.toString(16)}`, data },
                'latest',
            ],
        });
    });

    it('should scheduleEstimateGasPrice', async () => {
        await query.scheduleEstimateGasPrice().execute();
        expect(axios.post).toHaveBeenCalledWith(getEnv('GETH_RPC_URL'), {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_gasPrice',
            params: [],
        });
    });

    it('should scheduleEstimateNonce', async () => {
        const asset = 'asset';
        await query.scheduleEstimateNonce(asset).execute();
        expect(axios.post).toHaveBeenCalledWith(getEnv('GETH_RPC_URL'), {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_getTransactionCount',
            params: [asset, 'latest'],
        });
    });

    it('should scheduleGetBalance', async () => {
        const asset = 'asset';
        await query.scheduleGetBalance(asset).execute();
        expect(axios.post).toHaveBeenCalledWith(getEnv('GETH_RPC_URL'), {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_getBalance',
            params: [asset, 'latest'],
        });
    });

    it('should scheduleEstimateGasPrice', async () => {
        await query.scheduleEstimateGasPrice().execute();
        expect(axios.post).toHaveBeenCalledWith(getEnv('GETH_RPC_URL'), {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_gasPrice',
            params: [],
        });
    });

    it('should scheduleGetBlock', async () => {
        const height = 12;
        await query.scheduleGetBlock(height).execute();
        expect(axios.post).toHaveBeenCalledWith(getEnv('GETH_RPC_URL'), {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_getBlockByHash',
            params: [`0x${height.toString(16)}`, true],
        });
    });
});
