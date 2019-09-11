import 'reflect-metadata';
import { Expose } from 'class-transformer';

export class BinanceMarket {
    @Expose({ name: 'base_asset_symbol' })
    baseAssetSymbol: string;
    @Expose({ name: 'list_price' })
    listPrice: string;
    @Expose({ name: 'lot_size' })
    lotSize: string;
    @Expose({ name: 'quote_asset_symbol' })
    quoteAssetSymbol: string;
    @Expose({ name: 'tick_size' })
    tickSize: string;
}
