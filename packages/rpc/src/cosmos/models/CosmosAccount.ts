import 'reflect-metadata';
import { Expose, Transform, Type } from 'class-transformer';
import BigNumber from 'bignumber.js';

class Coin {
    denom: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    amount: BigNumber;
}

class PublicKey {
    value: string;
    type: string;
}

export class CosmosAccount {
    address: string;
    @Type(() => PublicKey)
    @Expose({ name: 'public_key' })
    publicKey: PublicKey;
    @Type(() => Coin)
    coins: Coin[];
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    @Expose({ name: 'account_number' })
    accountNumber: BigNumber;
    @Transform(value => Number(value), { toClassOnly: true })
    sequence: number;
}

export class CosmosAccountResult {
    type: string;
    @Type(() => CosmosAccount)
    value: CosmosAccount;
}
