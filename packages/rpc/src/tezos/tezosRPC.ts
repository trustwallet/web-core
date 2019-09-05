import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { TezosHead, TezosManagerKey, TezosContract, TezosOperation, TezosBroadcastResult} from './models';
import { Query } from './Query';

export class TezosRPC {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    private query(): Query {
        return new Query(this.rpcUrl);
    }

    async getHead(): Promise<TezosHead> {
        let response = await axios.get(this.query().head());
        let head = plainToClass(TezosHead, response.data);
        return head
    }

    async manageKey(address: string): Promise<TezosManagerKey> {
        let response = await axios.get(this.query().manageKey(address));
        return plainToClass(TezosManagerKey, response.data);
    }

    async getAccount(address: string): Promise<TezosContract> {
        let response = await axios.get(this.query().account(address));
        let account = plainToClass(TezosContract, response.data);
        return account
    }

    async getBlockOperations(block: string): Promise<TezosOperation> {
        let response = await axios.get(this.query().blockOperations(block));
        return plainToClass(TezosOperation, response.data);
    }

    async broadcastTransaction(data: string): Promise<TezosBroadcastResult> {
        const url = this.query().broadcast();
        const options = {
            validateStatus: (status: number) => {
                return status >= 200 && status < 500;
            },
        };
        const response = await axios.post(url, data,options);
        return plainToClass(TezosBroadcastResult, response.data);
    }
}
