import 'reflect-metadata';
import { Type } from 'class-transformer';

class Order {
    symbol: string;
    price: string;
    quantity: string;
    cumulateQuantity: string;
    lastExecutedPrice: string;
    lastExecutedQuantity: string;
    transactionHash: string;
    status: string;
    orderId: string;
    owner: string;
    fee: string;
    tradeId: string;
}

export class BinanceOrder {
    total: number;
    @Type(() => Order)
    order: Order[];
}
