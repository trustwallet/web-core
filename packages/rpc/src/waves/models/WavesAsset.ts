import 'reflect-metadata';
import { Transform } from 'class-transformer';
import BigNumber from 'bignumber.js';

export class WavesAsset {
    assetId: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    issueHeight: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    issueTimestamp: BigNumber;
    issuer: string;
    name: string;
    description: string;
    decimals: number;
    reissuable: boolean;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    quantity: BigNumber;
    scripted: boolean;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    minSponsoredAssetFee: BigNumber;

}