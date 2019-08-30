import BigNumber from 'bignumber.js';

// Format number just like eth address
export function formatLikeEthAddress(value: number | BigNumber) {
    const padding = 40;
    let s = value.toString(16);
    while (s.length < padding) {
        s = '0' + s;
    }
    return '0x' + s;
}
