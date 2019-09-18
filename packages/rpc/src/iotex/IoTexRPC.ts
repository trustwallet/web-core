import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { IoTeXAccount, IoTexBroadcastResult, IoTexTransaction } from './models';
import { Query } from './Query';
import { NetworkError } from '../errors/network-error';

export class IoTexRPC {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    private query(): Query {
        return new Query(this.rpcUrl);
    }

    async getAccount(address: string): Promise<IoTeXAccount> {
        let response = await axios.get(this.query().getAccount(address));
        return plainToClass(IoTeXAccount, response.data);
    }

    async getTransactionByHash(hash: string): Promise<IoTexTransaction> {
        let response = await axios.get(this.query().getTransaction(hash));
        return plainToClass(IoTexTransaction, response.data);
    }

    async broadcastTransaction(data: string): Promise<IoTexBroadcastResult> {
        try {
            const url = this.query().broadcastTransaction(data);
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await axios.post(url, null, options);
            return plainToClass(IoTexBroadcastResult, response.data);
        } catch (error) {
            if (error.response) {
                throw new NetworkError(error.response.status, error.response.data);
            } else {
                throw error;
            }
        }
    }
}
