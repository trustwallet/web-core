export class EthereumBroadcastResult {
    result?: string;
    error?: string;

    get isError(): boolean {
        return this.error !== undefined;
    }
}
