export function toHex(data: Uint8Array, prefix: boolean = false): string {
    const encoded = data.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
    return prefix ? '0x' + encoded : encoded;
}

export function fromHex(data: string): Uint8Array {
    if (data === '' || data === null || data === undefined) {
        return new Uint8Array();
    }
    if (data.length % 2 !== 0) {
        throw new Error('invalid data size');
    }
    if (data.indexOf('0x') === 0) {
        data = data.substring(2);
    }
    return new Uint8Array(data.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}
