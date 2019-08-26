export class CosmosBroadcastResult {
    txhash?: string;
    height?: number;
    error?: string;

    get isError(): boolean {
        return this.error !== undefined;
    }
}
