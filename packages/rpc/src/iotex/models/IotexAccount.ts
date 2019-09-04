import 'reflect-metadata';
import { Transform, Type } from 'class-transformer';
import BigNumber from 'bignumber.js';

class IoTeXAccountMeta {
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    balance: BigNumber;
    pendingNonce: string;
    address: string;
}

export class IoTeXAccount {
    @Type(() => IoTeXAccountMeta)
    accountMeta: IoTeXAccountMeta;
}
