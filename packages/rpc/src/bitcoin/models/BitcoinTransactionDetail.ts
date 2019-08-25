import BigNumber from "bignumber.js";
import { Transform, Type } from "class-transformer";

class Output {
  @Transform(value => new BigNumber(value), { toClassOnly: true })
  value: BigNumber;
  addresses: string[];
  hex: string;

  get address(): string|null {
    return this.addresses.length > 0
      ? this.addresses[0]
      : null;
  }
}

export class BitcoinTransactionDetail {
  txid: string;
  confirmations: number;
  fees: string;
  version: number;
  @Transform(value => new BigNumber(value), { toClassOnly: true })
  blockHeight: BigNumber;
  @Transform(value => new BigNumber(value), { toClassOnly: true })
  blockTime: BigNumber;
  @Type(() => Output)
  vin: Output[];
  @Type(() => Output)
  vout: Output[];

  get from(): string[] {
    return BitcoinTransactionDetail.txAddresses(this.vin);
  }

  get to(): string[] {
    return BitcoinTransactionDetail.txAddresses(this.vout);
  }

  private static txAddresses(array: Output[]): string[] {
    return array
      .reduce((acc, output) => [ ...acc, ...output.addresses ], ([] as string[])) // Flatmap
      .reduce((acc, addr) => acc.indexOf(addr) >= 0 ? [ ...acc, addr ] : acc, ([] as string[])); // Unique
  }
}
