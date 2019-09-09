import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { Query } from './Query';
import { BinanceAccount, BinanceMarket, BinanceNodeInfo, BinanceOrder, BinanceRPCTransaction, BinanceBroadcastResult } from './models';

export class BinanceRPC {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    private query(): Query {
        return new Query(this.rpcUrl);
    }

    async getAccount(address: string): Promise<BinanceAccount> {
        const {data} = await axios.get(this.query().getAccount(address));
        return plainToClass(BinanceAccount, data);
    }

    async getMarket(limit?: number, offset?: number): Promise<BinanceMarket> {
        const {data} = await axios.get(this.query().getMarket(limit,offset));
        return plainToClass(BinanceMarket, data);
    }

    async getNodeInfo(limit?: number, offset?: number): Promise<BinanceNodeInfo> {
        const {data} = await axios.get(this.query().getNodeInfo());
        return plainToClass(BinanceNodeInfo, data);
    }

    async getOrder(order: string, address: string, symbol: string): Promise<BinanceOrder> {
        const {data} = await axios.get(this.query().getOrder(order,address,symbol));
        return plainToClass(BinanceOrder, data);
    }

    async getTransaction(transactionHash: string): Promise<BinanceRPCTransaction> {
        const {data} = await axios.get(this.query().getTransaction(transactionHash));
        return plainToClass(BinanceRPCTransaction, data);
    }

    async broadcastTransaction(requestData: string, sync: string): Promise<BinanceBroadcastResult> {
        const url = this.query().broadcastTransaction(sync);
        const options = {
            headers : {
                "Content-Type" : "text/plain"
            },
            validateStatus: (status: number) => {
                return status >= 200 && status < 500;
            },
        };
        const {data} = await axios.post(url, requestData, options);
        return plainToClass(BinanceBroadcastResult, data);
    }
}
