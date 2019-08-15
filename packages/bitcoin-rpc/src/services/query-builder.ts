import { Inject, Service } from 'typedi';
import { Query } from './query';

@Service()
export class QueriesBuilder {
    private readonly BASE_URL: string;
    private readonly BASE_URL_OLD: string;

    readonly STATUS = { action: Query.STATUS, url: () => `${this.BASE_URL_OLD}` };
    readonly BLOCK_INDEX = {
        action: Query.BLOCK_INDEX,
        url: (height: number) => `${this.BASE_URL}/${Query.BLOCK_INDEX}/${height}`,
    };
    readonly TX = { action: Query.TX, url: (txid: string) => `${this.BASE_URL}/${Query.TX}/${txid}` };
    readonly TX_SPECIFIC = {
        action: Query.TX_SPECIFIC,
        url: (txid: string) => `${this.BASE_URL}/${Query.TX_SPECIFIC}/${txid}`,
    };
    readonly ADDRESS = {
        action: Query.ADDRESS,
        url: (address: string) => `${this.BASE_URL}/${Query.ADDRESS}/${address}`,
    };
    readonly XPUB = { action: Query.XPUB, url: (xpub: string) => `${this.BASE_URL}/${Query.XPUB}/${xpub}` };
    readonly UTXO = { action: Query.UTXO, url: (utxo: string) => `${this.BASE_URL}/${Query.UTXO}/${utxo}` };
    readonly FEE = { action: Query.FEE, url: (blocks: number) => `${this.BASE_URL_OLD}/${Query.FEE}/${blocks}` };
    readonly BLOCK = { action: Query.BLOCK, url: (block: number) => `${this.BASE_URL}/${Query.BLOCK}/${block}` };
    readonly SENDTX = { action: Query.SENDTX, url: () => `${this.BASE_URL}/${Query.SENDTX}` };

    // private to disallow creating other instances of this type
    private constructor(@Inject('blockbookAddr') addr: string) {
        this.BASE_URL = addr + '/api/v2';
        this.BASE_URL_OLD = addr + '/api';
    }
}
