export class BitcoinBroadcastResult {
    result?: string;
    error?: string;

    get isError(): boolean {
        return this.error !== undefined;
    }
}
