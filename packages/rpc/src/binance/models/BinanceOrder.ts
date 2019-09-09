import 'reflect-metadata';
import { Type } from 'class-transformer';

class Order {
    symbol: String
    price: String
    quantity: String
    cumulateQuantity: String
    lastExecutedPrice: String
    lastExecutedQuantity: String
    transactionHash: String
    status: string
    orderId: string
    owner: string 
    fee: string
    tradeId: string
}

export class BinanceOrder {
    total : number
    @Type(() => Order)
    order : Order[]
}

