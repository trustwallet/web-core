export enum Query {
    STATUS = 'status',
    BLOCK_INDEX = 'block-index',
    TX = 'tx',
    TX_SPECIFIC = 'tx-specific',
    ADDRESS = 'address',
    XPUB = 'xpub',
    UTXO = 'utxo',
    BLOCK = 'block',
    SENDTX = 'sendtx',
    FEE = 'estimatefee',
}

export interface QueriesI {
    action: Query;
    url: string;
}
