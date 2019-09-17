import axios from 'axios';
import { NetworkError } from '../errors/network-error';

export interface EthRPCResult {
    id: number;
    jsonrpc: string;
    result: string;
}

export class QueryBuilder {
    private uri: string;
    private params: { [key: string]: any };

    constructor(private rpcUrl: string) {}

    scheduleGetLatestBlock(): QueryBuilder {
        this.uri = this.endpoint();
        this.params = this.createParams('eth_blockNumber');
        return this;
    }
    scheduleGetBlock(blockHeight: number): QueryBuilder {
        this.uri = this.endpoint();
        this.params = this.createParams('eth_getBlockByHash', [this.hexNumber(blockHeight), true]);
        return this;
    }
    scheduleGetBalance(asset: string): QueryBuilder {
        this.uri = this.endpoint();
        this.params = this.createParams('eth_getBalance', [asset, 'latest']);
        return this;
    }
    scheduleGetTransactionDetail(hash: string): QueryBuilder {
        this.uri = this.endpoint();
        this.params = this.createParams('eth_getTransactionByHash', [hash]);
        return this;
    }
    scheduleEstimateNonce(asset: string): QueryBuilder {
        this.uri = this.endpoint();
        this.params = this.createParams('eth_getTransactionCount', [asset, 'latest']);
        return this;
    }
    scheduleEstimateGasPrice(): QueryBuilder {
        this.uri = this.endpoint();
        this.params = this.createParams('eth_gasPrice');
        return this;
    }
    scheduleEstimateGasLimit(from: string, to: string, value: number, gasPrice: number, data: any): QueryBuilder {
        this.uri = this.endpoint();
        this.params = this.createParams('eth_estimateGas', [
            { from, to, value: this.hexNumber(value), gasPrice: this.hexNumber(gasPrice), data },
            'latest',
        ]);
        return this;
    }
    scheduleBroadcastTransaction(data: string): QueryBuilder {
        this.uri = this.endpoint();
        this.params = this.createParams('eth_sendRawTransaction', [data]);
        return this;
    }

    async execute(): Promise<EthRPCResult> {
        try {
            const resp = await axios.post(this.uri, this.params);
            return resp.data;
        } catch (error) {
            if (error.response) {
                throw new NetworkError(error.response.status, error.response.data);
            } else {
                throw error;
            }
        }
    }

    private endpoint(): string {
        return `${this.rpcUrl}`;
    }

    private createParams(action: string, data: any[] = []): { [key: string]: any } {
        return {
            jsonrpc: '2.0',
            method: action,
            params: data,
            id: 1,
        };
    }

    private hexNumber(number: number): string {
        return `0x${number.toString(16)}`;
    }
}
