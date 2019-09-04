import 'reflect-metadata';
import {Transform, Type} from 'class-transformer';
import BigNumber from 'bignumber.js';

class Receipt {
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    blkHeight: BigNumber;
}

class ReceiptInfo {
    receipt: Receipt;
}

export class IoTexBroadcastResult {
    @Type(() => ReceiptInfo)
    receiptInfo: ReceiptInfo;
}
