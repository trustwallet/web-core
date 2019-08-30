import BigNumber from 'bignumber.js';

// TODO: use BigInt and polyfill
export function toAtom(microatom : any) : number {
    const denominator = new BigNumber(1000000) as any;
    return Number(microatom / denominator);
}
