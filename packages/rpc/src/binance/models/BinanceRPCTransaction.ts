import 'reflect-metadata';
import { Type } from 'class-transformer';

class Transaction {
    type: string;
}

export class BinanceRPCTransaction {
    hash: string;
    ok: boolean;
    @Type(() => Transaction)
    tx: Transaction;
}
