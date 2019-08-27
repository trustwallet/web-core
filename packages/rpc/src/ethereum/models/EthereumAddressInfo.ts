import 'reflect-metadata';
import BigNumber from 'bignumber.js';
import { Transform, Type } from 'class-transformer';
import { EthereumTransactionDetail } from './EthereumTransactionDetail';

export class EthereumAddressInfo {
    page: number;
    totalPages: number;
    itemsOnPage: number;

    address: string;
    txids: string[];

    @Type(() => EthereumTransactionDetail)
    txs: EthereumTransactionDetail[];

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    balance: BigNumber;
}
