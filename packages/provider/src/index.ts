import { IAccount } from "@trustwallet/types"

export interface IProvider {
    getAccounts: () => Promise<IAccount[]>
    signTransaction: (params: { network: number, transaction: any }) => Promise<any>
}

export class TrustProvider {
    public static get isAvailable(): boolean {
        return TrustProvider.provider !== undefined
    }

    private static get provider(): IProvider {
        return window["trustProvider"];
    }

    public static getAccounts(): Promise<IAccount[]> {
        return TrustProvider.provider.getAccounts();
    }

    public static signTransaction(network: number, transaction: any): Promise<any> {
        return TrustProvider.provider.signTransaction({ network: network, transaction: transaction });
    }
}

export default TrustProvider
