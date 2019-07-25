import Connector from "@walletconnect/core"
import { IWalletConnectOptions } from "@walletconnect/types"
import * as cryptoLib from "@walletconnect/browser/src/webCrypto"
import WebStorage from "@walletconnect/browser/src/webStorage"

export interface IAccount {
    network: number
    address: string
}

class WalletConnect extends Connector {
    constructor (opts: IWalletConnectOptions) {
        super(cryptoLib, opts, null, WebStorage)
    }

    public async getAccounts(): Promise<IAccount[]> {
        if (!this.connected) {
            throw new Error('Session currently disconnected')
        }

        const request = this._formatRequest({
            method: 'get_accounts'
        });

        try {
            return await this._sendCallRequest(request)
        } catch (error) {
            throw error
        }
    }

    public async trustSignTransaction(network: number, transaction: any): Promise<any> {
        if (!this.connected) {
            throw new Error('Session currently disconnected')
        }

        const request = this._formatRequest({
            method: 'trust_signTransaction',
            params: [
                {
                    network,
                    transaction: JSON.stringify(transaction)
                }
            ]
        });

        try {
            return await this._sendCallRequest(request)
        } catch (error) {
            throw error
        }
    }
}

export default WalletConnect
