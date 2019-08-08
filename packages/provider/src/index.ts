import { Account } from '@trustwallet/types';

interface Provider {
    getAccounts: () => Promise<Account[]>;
    // TODO make explicit transaction type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    signTransaction: (params: { network: number; transaction: any }) => Promise<string>;
}

declare global {
    // tslint:disable-next-line
    interface Window {
        provider: Provider;
    }
}

export class TrustProvider {
    public static get isAvailable(): boolean {
        return TrustProvider.provider !== undefined;
    }
    private static get provider(): Provider {
        // @ts-ignore
        return window.trustProvider;
    }

    public static getAccounts(): Promise<Account[]> {
        return TrustProvider.provider.getAccounts();
    }

    // TODO make explicit transaction type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static signTransaction(network: number, transaction: any): Promise<string> {
        return TrustProvider.provider.signTransaction({ network, transaction });
    }
}
