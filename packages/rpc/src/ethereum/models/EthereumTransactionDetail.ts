import BigNumber from 'bignumber.js';
import { Transform } from 'class-transformer';

export class EthereumTransactionDetail {
    version: number;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    blockNumber: BigNumber;

    from: string;
    to: string;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    gas: BigNumber;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    gasPrice: BigNumber;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    nonce: BigNumber;
}
