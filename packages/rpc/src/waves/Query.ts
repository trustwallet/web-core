export class Query {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    getCurrentHeight = () => this.uri('/blocks/height');

    getAddress = (address: string) => this.uri(`/addresses/balance/details/${address}`);

    getAssetsBalances = (address: string) => this.uri(`/assets/balance/${address}`);

    getTransaction = (txid: string) => this.uri(`/transactions/info/${txid}`);

    getAssetDetails = (assetId: string) => this.uri(`/assets/details/${assetId}`);

    broadcastTransaction = () => this.uri('/transactions/broadcast');

    getActiveLeasings = (address: string) => this.uri(`/leasing/active/${address}`)


    private uri(path: string): string {
        return `${this.rpcUrl}${path}`;
    }
}
