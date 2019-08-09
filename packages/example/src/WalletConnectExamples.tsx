import * as React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import WalletConnect from '@trustwallet/walletconnect';
import WalletConnectQRCodeModal from '@walletconnect/qrcode-modal';
import { Account } from '@trustwallet/types';

interface State {
    isConnected: boolean;
}

interface Props {
    openModal(title: string, body: React.ReactNode): void;
    closeModal(): void;
}

export default class WalletConnectExamples extends React.Component<Props, State> {
    private walletConnector: WalletConnect = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org', // Required
    });

    constructor(props: Props) {
        super(props);
        this.state = {
            isConnected: false,
        };
    }

    private createConnector(): void {
        this.walletConnector = new WalletConnect({
            bridge: 'https://bridge.walletconnect.org', // Required
        });
    }

    private connect = async (): Promise<void> => {
        // Check if connection is already established
        if (!this.walletConnector.connected) {
            this.createConnector();
            // create new session
            await this.walletConnector.createSession();
            // get uri for QR Code modal
            const uri = this.walletConnector.uri;
            // display QR Code modal
            WalletConnectQRCodeModal.open(uri, () => {
                console.log('QR Code Modal closed');
            });

            this.subscribe();
        } else {
            await this.walletConnector.killSession();
        }
    };

    private subscribe(): void {
        // Subscribe to connection events
        this.walletConnector.on('connect', (error: string) => {
            if (error) {
                console.log('Error on connect:' + error);
            }
            // Close QR Code Modal
            WalletConnectQRCodeModal.close();
            this.setState({
                isConnected: true,
            });
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.walletConnector.on('session_update', (error: string, payload: any) => {
            if (error) {
                console.log('Error on seccion_update:' + error);
            }
            console.log(payload);
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.walletConnector.on('disconnect', (error: string, payload: any) => {
            if (error) {
                console.log('Error on disconnect:' + error);
            }
            console.log(payload);
            this.setState({
                isConnected: false,
            });
        });
    }

    private async getAccount(network: number): Promise<Account> {
        let accounts = await this.walletConnector
            .getAccounts()
            .then((list: Account[]) => list.filter(item => item.network === network));

        if (accounts.length < 1) {
            throw 'Account no found';
        }

        return accounts[0];
    }

    testGetAccounts = async (): Promise<void> => {
        let { openModal } = this.props;

        try {
            let accounts = await this.walletConnector.getAccounts();
            openModal('Accounts', <samp>{JSON.stringify(accounts)}</samp>);
        } catch (e) {
            openModal('Accounts Error', <div>{e}</div>);
        }
    };

    testCosmosSendCoins = async (): Promise<void> => {
        let { openModal } = this.props;

        try {
            let network = 118; // Cosmos
            let account = await this.getAccount(network);
            let transaction = {
                accountNumber: '1035',
                chainId: 'cosmoshub-2',
                fee: {
                    amounts: [
                        {
                            denom: 'uatom',
                            amount: '5000',
                        },
                    ],
                    gas: '200000',
                },
                sequence: '40',
                sendCoinsMessage: {
                    fromAddress: account.address,
                    toAddress: 'cosmos1zcax8gmr0ayhw2lvg6wadfytgdhen25wrxunxa',
                    amounts: [
                        {
                            denom: 'uatom',
                            amount: '100000',
                        },
                    ],
                },
            };

            let result = await this.walletConnector.trustSignTransaction(network, transaction);
            openModal('Cosmos Withdraw Signed', <samp>{result}</samp>);
        } catch (e) {
            openModal('Sign Error', <div>{e}</div>);
        }
    };

    testCosmosStake = async (): Promise<void> => {
        let { openModal } = this.props;

        try {
            let network = 118; // Cosmos
            let transaction = {
                typePrefix: 'auth/StdTx',
                accountNumber: '1035',
                chainId: 'cosmoshub-2',
                fee: {
                    amounts: [
                        {
                            denom: 'uatom',
                            amount: '5000',
                        },
                    ],
                    gas: '200000',
                },
                sequence: '40',
                stakeMessage: {
                    delegatorAddress: 'cosmos1hsk6jryyqjfhp5dhc55tc9jtckygx0eph6dd02',
                    validatorAddress: 'cosmosvaloper1zkupr83hrzkn3up5elktzcq3tuft8nxsmwdqgp',
                    amount: {
                        denom: 'uatom',
                        amount: '100000',
                    },
                },
            };

            let result = await this.walletConnector.trustSignTransaction(network, transaction);
            openModal('Cosmos Stake Signed', <samp>{result}</samp>);
        } catch (e) {
            openModal('Sign Error', <div>{e}</div>);
        }
    };

    testCosmosUnstake = async (): Promise<void> => {
        let { openModal } = this.props;

        try {
            let network = 118; // Cosmos
            let transaction = {
                typePrefix: 'auth/StdTx',
                accountNumber: '1035',
                chainId: 'cosmoshub-2',
                fee: {
                    amounts: [
                        {
                            denom: 'uatom',
                            amount: '5000',
                        },
                    ],
                    gas: '200000',
                },
                sequence: '40',
                unstakeMessage: {
                    delegatorAddress: 'cosmos1hsk6jryyqjfhp5dhc55tc9jtckygx0eph6dd02',
                    validatorAddress: 'cosmosvaloper1zkupr83hrzkn3up5elktzcq3tuft8nxsmwdqgp',
                    amount: {
                        denom: 'uatom',
                        amount: '100000',
                    },
                },
            };

            let result = await this.walletConnector.trustSignTransaction(network, transaction);
            openModal('Cosmos Unstake Signed', <samp>{result}</samp>);
        } catch (e) {
            openModal('Sign Error', <div>{e}</div>);
        }
    };

    testCosmosWithdraw = async (): Promise<void> => {
        let { openModal } = this.props;

        try {
            let network = 118; // Cosmos
            let transaction = {
                typePrefix: 'auth/StdTx',
                accountNumber: '1035',
                chainId: 'cosmoshub-2',
                fee: {
                    amounts: [
                        {
                            denom: 'uatom',
                            amount: '5000',
                        },
                    ],
                    gas: '200000',
                },
                sequence: '40',
                withdrawStakeRewardMessage: {
                    delegatorAddress: 'cosmos1hsk6jryyqjfhp5dhc55tc9jtckygx0eph6dd02',
                    validatorAddress: 'cosmosvaloper1zkupr83hrzkn3up5elktzcq3tuft8nxsmwdqgp',
                },
            };

            let result = await this.walletConnector.trustSignTransaction(network, transaction);
            openModal('Cosmos Withdraw Signed', <samp>{result}</samp>);
        } catch (e) {
            openModal('Sign Error', <div>{e}</div>);
        }
    };

    render(): JSX.Element {
        let { isConnected } = this.state;

        return (
            <>
                <Card>
                    <Card.Header>WalletConnect Examples</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            WalletConnect{' '}
                            <Badge variant={isConnected ? 'success' : 'danger'}>
                                {isConnected ? 'is connected' : 'is not connected'}
                            </Badge>
                        </Card.Title>
                        <Button size="lg" onClick={this.connect}>
                            {isConnected ? 'Disconnect' : 'Connect'}
                        </Button>
                        <Button size="lg" disabled={!isConnected} onClick={this.testGetAccounts}>
                            Get Accounts
                        </Button>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>Sign Cosmos Transaction Examples</Card.Header>
                    <Card.Body>
                        <Button size="lg" disabled={!isConnected} onClick={this.testCosmosSendCoins}>
                            Send Coins
                        </Button>
                        <Button size="lg" disabled={!isConnected} onClick={this.testCosmosStake}>
                            Stake
                        </Button>
                        <Button size="lg" disabled={!isConnected} onClick={this.testCosmosUnstake}>
                            Unstake
                        </Button>
                        <Button size="lg" disabled={!isConnected} onClick={this.testCosmosWithdraw}>
                            Withdraw
                        </Button>
                    </Card.Body>
                </Card>
            </>
        );
    }
}
