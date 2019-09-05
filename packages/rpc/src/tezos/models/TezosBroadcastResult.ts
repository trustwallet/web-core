export class TezosBroadcastResult {
    error?: string;

    isError(): boolean {
        return this.error !== undefined;
    }
}
