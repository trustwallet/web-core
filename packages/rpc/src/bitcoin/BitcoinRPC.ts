import rp from 'request-promise';

import { BitcoinUnspentResult } from "./models/BitcoinUnspentResult";
import { BitcoinBroadcastResult } from "./models/BitcoinBroadcastResult";
import { Query } from "./Query";
import { BitcoinBalanceResult } from "./models/BitcoinBalanceResult";
import { BitcoinTransactionDetail } from "./models/BitcoinTransactionDetail";
import { BitcoinEstimateFee } from "./models/BitcoinEstimateFee";
import { deserialize, deserializeArray } from "class-transformer";
import { BitcoinFeePriority } from "./BitcoinFeePriority";
import BigNumber from "bignumber.js";
import { BitcoinChainInfo } from "./models/BitcoinChainInfo";
import { BitcoinAddressInfo } from "./models/BitcoinAddressInfo";

export class BitcoinRPC {
  baseUrl:string;

  constructor(baseUrl:string) {
    this.baseUrl = baseUrl;
  }

  private query(): Query {
    return new Query(this.baseUrl);
  }

  async getLatestBlock(): Promise<BigNumber> {
    return deserialize(BitcoinChainInfo, await rp(this.query().getLatestBlock())).backend.blocks;
  }

  async getBalance(xpub: string): Promise<BitcoinBalanceResult> {
    return deserialize(BitcoinBalanceResult, await rp(this.query().getBalance(xpub)));
  }

  async listUnspent(xpub: string): Promise<BitcoinUnspentResult[]> {
    return deserializeArray(BitcoinUnspentResult, await rp(this.query().listUnspent(xpub)));
  }

  async listTransactions(address: string): Promise<string[]> {
    return deserialize(BitcoinAddressInfo, await rp(this.query().listTransactions(address))).txids;
  }

  async getTransactionDetail(hash: string): Promise<BitcoinTransactionDetail> {
    return deserialize(BitcoinTransactionDetail, await rp(this.query().getTransactionDetail(hash)));
  }

  async estimateFee(priority: BitcoinFeePriority): Promise<number> {
    return deserialize(BitcoinEstimateFee, await rp(this.query().estimateFee(priority))).result;
  }

  async broadcastTransaction(data: string): Promise<BitcoinBroadcastResult> {
    const request = {
      method: 'POST',
      uri: this.query().broadcastTransaction(),
      body: data,
      simple: false,
      headers: {
        'content-type': 'text/plain; charset=utf-8'
      },
    };
    return deserialize(BitcoinBroadcastResult, await rp(request));
  }
}
