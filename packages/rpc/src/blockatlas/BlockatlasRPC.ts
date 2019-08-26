import 'reflect-metadata';
import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { BlockatlasValidatorResult } from './models';
import { Query } from './Query';

export class BlockatlasRPC {
    rpcUrl: string;
    network: string;

    constructor(rpcUrl: string, network: string) {
        this.rpcUrl = rpcUrl;
        this.network = network;
    }

    private query(): Query {
        return new Query(this.rpcUrl, this.network);
    }

    async listTransactions(address: string): Promise<BlockatlasValidatorResult> {
        const response = await axios.get(this.query().listTransactions(address));
        return plainToClass(BlockatlasValidatorResult, response.data);
    }

    async listValidators(): Promise<BlockatlasValidatorResult> {
        const response = await axios.get(this.query().listValidators());
        return plainToClass(BlockatlasValidatorResult, response.data);
    }
}
