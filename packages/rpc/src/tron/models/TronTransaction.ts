import 'reflect-metadata';
import { Expose, Transform, Type } from 'class-transformer';

class TronContractParameter {
    value: any;
    type_url: string;
}

class TronContract {
    type: string;
    @Type(() => TronContractParameter)
    parameter: TronContractParameter;
}

class TronTransactionRawData {
    refBlockBytes: string;
    refBlockHash: string;
    fee_limit: number;

    @Transform(value => new Date(value), { toClassOnly: true })
    timestamp: Date;

    @Transform(value => new Date(value), { toClassOnly: true })
    expiration: Date;

    @Type(() => TronContract)
    contract: TronContract[];
}

export class TronTransaction {
    txID: string;
    signature: string[];

    @Expose({ name: 'raw_data' })
    @Type(() => TronTransactionRawData)
    rawData: TronTransactionRawData;

    @Expose({ name: 'raw_data_hex' })
    rawDataHex: string;
}
