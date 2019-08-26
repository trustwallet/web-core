import { Type, Transform } from 'class-transformer';
import BigNumber from 'bignumber.js';
import { BlockatlasResult } from "./BlockatlasResult";

class Metadata {
  @Transform(value => new BigNumber(value), { toClassOnly: true })
  value: BigNumber;
  symbol: string;
  decimals: number;
  title?: string;
  key?: string;
  name?: string;
}

export class BlockatlasTransaction {
  id: string;
  coin: number;
  from: string;
  to: string;
  @Transform(value => new BigNumber(value), { toClassOnly: true })
  fee: BigNumber;
  @Transform(value => new BigNumber(value), { toClassOnly: true})
  block: BigNumber;
  @Transform(value => new Date(value * 1000), { toClassOnly: true})
  date: Date;
  status: string;
  type: string;
  memo: string;
  @Type(() => Metadata)
  metadata: Metadata;
}

export class BlockatlasTransactionResult extends BlockatlasResult {
  @Type(() => BlockatlasTransaction)
  docs: BlockatlasTransaction[];
}
