import Hex from './hex';

describe('Hex', () => {
   it('should encode data', () => {
      const expected = "0xff000a";
      const encoded = Hex.encode(new Uint8Array([ 255, 0, 10 ]),  true);
      expect(encoded).toEqual(expected);
   });

   it('should decode data', () => {
      const expected = new Uint8Array([ 255, 0, 10 ]);
      const decoded = Hex.decode("0xff000a");
      expect(decoded).toEqual(expected);
   });
});
