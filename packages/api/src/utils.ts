import { CoinType } from '@trustwallet/types';

export class Utils {
    static coinToAddress(coin: CoinType): string {
        const padding = 40;
        let s = String(Number(coin).toString(16));
        while (s.length < padding) {
            s = '0' + s;
        }
        return '0x' + s;
    }
}

export const getEnv = (envName: string): string => `${process.env[envName]}`;
