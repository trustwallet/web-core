import 'reflect-metadata';
import axios from 'axios';
import { plainToClass } from 'class-transformer';
import BigNumber from 'bignumber.js';
import { Query } from './Query';
import { CoinType } from '@trustwallet/types/lib/CoinType';
import Utils from '@trustwallet/trust-api';
import { PriceResponse } from './models/PriceInfo';

export class TrustRPC {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    private query(): Query {
        return new Query(this.rpcUrl);
    }

    async getPrices(coinType: CoinType, currency: string): Promise<BigNumber> {
        const url = this.query().getPrices();
        const addr = Utils.coinToAddress(coinType);
        const body = {
            currency,
            tokens: [
                {
                    contract: addr,
                },
            ],
        };

        const respRaw = await axios.post(url, body);
        const resp = plainToClass(PriceResponse, respRaw.data);
        const coins = resp.docs;
        const cosmos = coins.find(coin => coin.contract === addr);
        return cosmos ? cosmos.price : null;
    }
}
