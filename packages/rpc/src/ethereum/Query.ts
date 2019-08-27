export class Query {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    getLatestBlock = () => this.uri(`/`);
    getBlock = (blockHeight: number) => this.uri(`/block/${blockHeight}`);
    getBalance = (xpub: string) => this.uri(`/address/${xpub}?tokens=used`);
    getTransactionDetail = (hash: string) => this.uri(`/tx/${hash}`);
    broadcastTransaction = () => this.uri('/sendtx/');
    addressInfo = (address: string) => this.uri(`/address/${address}`);

    private uri(path: string): string {
        return `${this.rpcUrl}/v2${path}`;
    }
}
