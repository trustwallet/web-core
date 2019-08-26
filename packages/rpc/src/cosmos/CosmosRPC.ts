import rp from 'request-promise';
import { CosmosDelegation, CosmosAccount, CosmosBroadcastResult } from './models';
import { deserialize, deserializeArray } from 'class-transformer';
import { Query } from './Query';
import { CosmosAccountResult } from './models/CosmosAccount';

export class CosmosRPC {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    private query(): Query {
        return new Query(this.rpcUrl);
    }

    async listDelegations(address: string): Promise<CosmosDelegation[]> {
        let result = await rp(this.query().listDelegations(address));
        return deserializeArray(CosmosDelegation, result);
    }

    async getAccount(address: string): Promise<CosmosAccount> {
        let result = await rp(this.query().getAccount(address));
        return deserialize(CosmosAccountResult, result).value;
    }

    async broadcastTransaction(data: string): Promise<CosmosBroadcastResult> {
        const request = {
            method: 'POST',
            uri: this.query().broadcastTransaction(),
            body: data,
            simple: false,
        };

        return deserialize(CosmosBroadcastResult, await rp(request));
    }
}
