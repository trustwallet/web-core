import Hex from './hex';
import Base58 from './base58';

describe('Base58', () => {
    it('should encode data', () => {
        const data = Hex.decode("05743df2a73bd1efc6347a11787adc2f8ecd32b34d58927ff35db25cd0b82ec1c41b392f024a");
        const encoded = Base58.encode(data);
        const expected = "oo7VeTEPjEusPKnsHtKcGYbYa7i4RWpcEhUVo3Suugbbs6K62Ro";
        expect(encoded).toEqual(expected);
    });

    it('should decode data', () => {
        const expected = "05743df2a73bd1efc6347a11787adc2f8ecd32b34d58927ff35db25cd0b82ec1c41b392f024a";
        const decoded = Hex.encode(Base58.decode("oo7VeTEPjEusPKnsHtKcGYbYa7i4RWpcEhUVo3Suugbbs6K62Ro"));
        expect(decoded).toEqual(expected);
    });
});
