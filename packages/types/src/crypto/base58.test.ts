import { toHex, fromHex } from './hex';
import { toBase58, fromBase58 } from './base58';

describe('Base58', () => {
    it('should encode data', () => {
        const data = fromHex('05743df2a73bd1efc6347a11787adc2f8ecd32b34d58927ff35db25cd0b82ec1c41b392f024a');
        const encoded = toBase58(data);
        const expected = 'oo7VeTEPjEusPKnsHtKcGYbYa7i4RWpcEhUVo3Suugbbs6K62Ro';
        expect(encoded).toEqual(expected);
    });

    it('should decode data', () => {
        const expected = '05743df2a73bd1efc6347a11787adc2f8ecd32b34d58927ff35db25cd0b82ec1c41b392f024a';
        const decoded = toHex(fromBase58('oo7VeTEPjEusPKnsHtKcGYbYa7i4RWpcEhUVo3Suugbbs6K62Ro'));
        expect(decoded).toEqual(expected);
    });
});
