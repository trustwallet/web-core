import rp from 'request-promise';
import 'reflect-metadata';
import { deserialize } from 'class-transformer';
import { BlockatlasValidatorResult } from "./models";
import { Query } from "./Query";

export class BlockatlasRPC {
  rpcUrl: string;
  network: string;

  constructor(rpcUrl: string, network: string) {
    this.rpcUrl = rpcUrl;
    this.network = network;
  }

  private query(): Query {
    return new Query(this.rpcUrl, this.network);
  }

  async listTransactions(address: string): Promise<BlockatlasValidatorResult> {
    return deserialize(BlockatlasValidatorResult, await rp(this.query().listTransactions(address)));
  }

  async listValidators(): Promise<BlockatlasValidatorResult> {
    return deserialize(BlockatlasValidatorResult, await rp(this.query().listValidators()));
  }
}
