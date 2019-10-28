import 'reflect-metadata';
import { Transform, Type } from 'class-transformer';
import BigNumber from 'bignumber.js';
import { WavesIssueTransaction } from './WavesTransaction';

export class WavesAssetBalance {
    assetId: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    balance: BigNumber;
    reissuable: boolean;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    minSponsoredAssetFee: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    sponsorBalance: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    quantity: BigNumber;
    @Type(() => WavesIssueTransaction)
    issueTransaction: WavesIssueTransaction;

}

export class WavesAssetsBalances{
    address: string;
    @Type(() => WavesAssetBalance)
    balances: WavesAssetBalance[];
}