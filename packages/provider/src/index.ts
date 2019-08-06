import { IAccount } from "@trustwallet/types";

interface IProvider {
    getAccounts: () => Promise<IAccount[]>;
    signTransaction: (params: { network: number, transaction: any }) => Promise<string>;
}

declare global {
    // tslint:disable-next-line
    interface Window {
        provider: any;
    }
}

export class TrustProvider {
    public static get isAvailable(): boolean {
        return TrustProvider.provider !== undefined;
    }
    private static get provider(): IProvider {
        // tslint:disable-next-line
        return window.provider;
    }

    public static getAccounts(): Promise<IAccount[]> {
        return TrustProvider.provider.getAccounts();
    }

    public static signTransaction(network: number, transaction: any): Promise<string> {
        return TrustProvider.provider.signTransaction({ network, transaction });
    }
}
