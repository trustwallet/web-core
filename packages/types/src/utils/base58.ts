import { toHex, fromHex } from './hex';
import BigNumber from 'bignumber.js';

const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const BASE = new BigNumber(ALPHABET.length);

export function toBase58(data: Uint8Array | string): string {
    let encoded: string = '';
    if (data instanceof Uint8Array) {
        data = toHex(data);
    }

    let num = new BigNumber(data, 16);
    let zero = new BigNumber(0);

    while (num.isGreaterThan(zero)) {
        let pos = num.mod(BASE).toNumber();
        let char = ALPHABET.charAt(pos);
        encoded = char + encoded;
        num = num.dividedToIntegerBy(BASE);
    }

    return encoded;
}

export function fromBase58(data: string): Uint8Array {
    if (data === '' || data === null || data === undefined) {
        return new Uint8Array();
    }

    let answer = new BigNumber(0);
    let base = new BigNumber(1);

    for (let i = data.length - 1; i >= 0; i--) {
        let pos = ALPHABET.indexOf(data.charAt(i));
        if (pos === -1) {
            throw new Error('Invalid Base58 data');
        }
        let num = new BigNumber(pos);
        answer = answer.plus(num.times(base));
        base = base.times(BASE);
    }

    let hex = answer.toString(16);
    if (hex.length % 2 !== 0) {
        hex = '0' + hex;
    }

    return fromHex(hex);
}
