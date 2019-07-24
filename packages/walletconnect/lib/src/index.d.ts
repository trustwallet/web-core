import Connector from "@walletconnect/core";
import { IWalletConnectOptions } from "@walletconnect/types";
export interface IAccount {
    network: number;
    address: string;
}
declare class WalletConnect extends Connector {
    constructor(opts: IWalletConnectOptions);
    getAccounts(): Promise<IAccount[]>;
    trustSignTransaction(network: number, transaction: any): Promise<any>;
}
export default WalletConnect;
//# sourceMappingURL=index.d.ts.map