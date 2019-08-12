import { Account } from '@trustwallet/types';
import BigNumber from 'bignumber.js';

export const GAS_LIMIT = '200000';

export interface CosmosAccount extends Account {
    coinsDenom: string;
    coinsValue: BigNumber;
    pubKeyType: string; // TODO add pubKeyType enum -> "tendermint/PubKeySecp256k1"
    pubKey: string; //TODO add pubkey type / validation
    accountNumber: number;
    sequence: number;
}

// TODO refactor to shared
// export enum pubKeyType {
//     secp256k1 = 'tendermint/PubKeySecp256k1',
// }

export enum denom {
    uatom = 'uatom',
    // stake = 'stake',
}

// TODO refactor to shared
// export interface Validator {
//     status: boolean;
//     name: string;
//     description: string;
//     website: string;
//     address: Address; // TODO add validation
//     pubkey: PublicKey; // TODO add validation
// }

// TODO refactor to shared
export interface Transaction {
    id: string;
    coin: number; // TODO Add Coin Type
    from: Address; // TODO add validation
    to: Address; // TODO add validation
    fee: BigNumber;
    date: Date;
    block: number;
    status: string; // TODO add enum -> "Completed"
    type: string; // TODO add enum -> "Transfer"
    memo: string;
    value: BigNumber;
}

export enum msgType {
    send = 'cosmos-sdk/MsgSend',
    delegate = 'cosmos-sdk/MsgDelegate',
}

// TODO refactor to shared
export interface Delegation {
    delegatorAddress: string;
    validatorAddress: string;
    shares: BigNumber;
}

// TODO refactor to shared
// export interface PublicKey {
//     type: pubKeyType;
//     value: string;
// }

// TODO refactor to shared
export interface Signature {
    value: string;
}

// TODO refactor to shared
export interface Address {
    value: string;
}

// TODO refactor to shared
export interface TxHash {
    value: string;
}
