import { fromBase64, toBase64 } from './base64';
import { fromHex, toHex } from './hex';

describe('Base64', () => {
    it('should encode data', () => {
        const expected = 'dHJ1c3Qgd2ViIGlzIGNvb2w=';
        const data = fromHex('74727573742077656220697320636f6f6c');
        const encoded = toBase64(data);
        expect(encoded).toEqual(expected);
    });

    it('should decode data', () => {
        const expected = '74727573742077656220697320636f6f6c';
        const decoded = fromBase64('dHJ1c3Qgd2ViIGlzIGNvb2w=');
        expect(toHex(decoded)).toEqual(expected);
    });
});
