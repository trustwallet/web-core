import Hex from './hex';
import BigNumber from 'bignumber.js';

export default class Base58 {
    private static ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    private static BASE = new BigNumber(Base58.ALPHABET.length);

    static encode(data: Uint8Array | string): string {
        let encoded: string = '';
        if (data instanceof Uint8Array) {
            data = Hex.encode(data);
        }

        let num = new BigNumber(data, 16);
        let zero = new BigNumber(0);

        while (num.isGreaterThan(zero)) {
            let pos = num.mod(Base58.BASE).toNumber();
            let char = Base58.ALPHABET.charAt(pos);
            encoded = char + encoded;
            num = num.dividedToIntegerBy(Base58.BASE);
        }

        return encoded;
    }

    static decode(data: string): Uint8Array {
        let answer = new BigNumber(0);
        let base = new BigNumber(1);

        for (let i = data.length - 1; i >= 0; i--) {
            let pos = Base58.ALPHABET.indexOf(data.charAt(i));
            if (pos === -1) {
                throw new Error("Invalid Base58 data");
            }
            let num = new BigNumber(pos);
            answer = answer.plus(num.times(base));
            base = base.times(Base58.BASE);
        }

        let hex = answer.toString(16);
        if (hex.length % 2 !== 0) {
            hex = "0" + hex;
        }

        return Hex.decode(hex);
    }
}
