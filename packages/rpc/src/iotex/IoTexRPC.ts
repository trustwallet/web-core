import axios from 'axios';
import { plainToClass } from 'class-transformer';
import {IoTeXAccount, IoTexBroadcastResult, IoTexTransaction} from './models';
import { Query } from './Query';

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
        console.log(response);
        return plainToClass(IoTeXAccount, response.data);
    }


    async getTransactionByHash(hash: string): Promise<IoTexTransaction> {
        let response = await axios.get(this.query().getTransaction(hash));
        //todo get blkHeight by calling broadcast
        console.log(response)
        return plainToClass(IoTexTransaction, response.data);
    }


    async broadcastTransaction(data: string): Promise<IoTexBroadcastResult> {
        const url = this.query().broadcastTransaction();
        const options = {
            validateStatus: (status: number) => {
                return status >= 200 && status < 500;
            },
        };
        const response = await axios.post(url, data, options);
        console.log(response);
        return plainToClass(IoTexBroadcastResult, response.data);
    }
}
