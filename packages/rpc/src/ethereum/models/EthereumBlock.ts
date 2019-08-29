import { Type } from 'class-transformer';

class ShortTx {
    txid: string;
}

export class EthereumBlock {
    @Type(() => ShortTx)
    txs: ShortTx[];
}
