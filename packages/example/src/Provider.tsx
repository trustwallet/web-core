import * as React from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import { TrustProvider } from "@trustwallet/provider";

interface IState {
  getAccountsLoading: boolean,
  signTransactionLoading: boolean
}

interface IProps {
  openModal(title: string, body: React.ReactNode): void,
  closeModal(): void,
}

export default class Provider extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      getAccountsLoading: false,
      signTransactionLoading: false
    };
  }

  testGetAccounts = async () => {
    let { openModal } = this.props;

    try {
      let accounts = await TrustProvider.getAccounts();
      openModal("Accounts", <samp>{JSON.stringify(accounts)}</samp>);
    } catch (e) {
      openModal("Accounts Error", <div>{e}</div>);
    }
  };

  testSignTransaction = async () => {
    let { openModal } = this.props;

    try {
      let network = 118; // Cosmos
      let transaction = {
          "accountNumber": "1035",
          "chainId": "cosmoshub-2",
          "fee": {
            "amounts": [
              {
                "denom": "uatom",
                "amount": "5000"
              }
            ],
            "gas": "200000"
          },
          "sequence": "40",
          "sendCoinsMessage": {
            "fromAddress": "cosmos135qla4294zxarqhhgxsx0sw56yssa3z0f78pm0",
            "toAddress": "cosmos1zcax8gmr0ayhw2lvg6wadfytgdhen25wrxunxa",
            "amounts": [
              {
                "denom": "uatom",
                "amount": "100000"
              }
            ]
          }
        };

      let result = await TrustProvider.signTransaction(network, transaction);
      openModal("Transaction Signed", <samp>{result}</samp>);
    } catch (e) {
      openModal("Sign Error", <div>{e}</div>);
    }
  };

  get isAvailable(): boolean {
    return TrustProvider.isAvailable
  }

  render () {
    return <Card>
      <Card.Header>Provider Examples</Card.Header>
      <Card.Body>
        <h2>
          Trust Provider is <Badge variant={ this.isAvailable ? "success" : "danger" }>{this.isAvailable ? "Available" : "Not Available"}</Badge>
        </h2>
        <Button block size="lg" disabled={!this.isAvailable} onClick={this.testGetAccounts}>Get Accounts</Button>
        <Button block size="lg" disabled={!this.isAvailable} onClick={this.testSignTransaction}>Sign Transaction</Button>
      </Card.Body>
    </Card>
  }
}
