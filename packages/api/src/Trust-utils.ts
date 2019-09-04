import { CoinType } from '@trustwallet/types';

export default class TrustUtils {
    static coinToAddress(coin: CoinType) {
        const padding = 40;
        let s = String(Number(coin).toString(16));
        while (s.length < padding) {
            s = '0' + s;
        }
        return '0x' + s;
    }
}
