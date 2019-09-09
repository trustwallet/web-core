import 'reflect-metadata';
import { Type } from 'class-transformer';

class Transaction {
    type: String
}

export class BinanceRPCTransaction {
    hash: String
    ok: boolean
    @Type(() => Transaction)
    tx: Transaction
}