import { fromHex, toHex } from './hex';

describe('Hex', () => {
    it('should encode data', () => {
        const expected = '0xff000a';
        const encoded = toHex(new Uint8Array([255, 0, 10]), true);
        expect(encoded).toEqual(expected);
    });

    it('should decode data', () => {
        const expected = new Uint8Array([255, 0, 10]);
        const decoded = fromHex('0xff000a');
        expect(decoded).toEqual(expected);
    });
});
