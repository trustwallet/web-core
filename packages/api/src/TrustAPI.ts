import 'reflect-metadata';
import axios from 'axios';
import { plainToClass } from 'class-transformer';
import BigNumber from 'bignumber.js';
import { Query } from './Query';
import { CoinType, FiatCoinType } from '@trustwallet/types';
import { Utils } from './utils';
import { PriceResponse } from './models';

export class TrustAPI {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    private query(): Query {
        return new Query(this.url);
    }

    async getPrices(coinType: CoinType, currency: FiatCoinType): Promise<BigNumber> {
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
        const result = coins.find(coin => coin.contract === addr);
        return result ? result.price : null;
    }
}
