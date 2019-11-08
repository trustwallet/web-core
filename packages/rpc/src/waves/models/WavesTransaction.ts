import 'reflect-metadata';
import {Transform, Type} from 'class-transformer';
import BigNumber from 'bignumber.js';

export class WavesTransferTransaction {
    type: number;
    version: number;
    senderPublicKey: string;
    assetId: string;
    recipient: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    amount: BigNumber;
    attachment: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    fee: BigNumber;
    feeAssetId: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    timestamp: BigNumber;
    proofs: string[];
    id: string;
}

export class WavesLeaseTransaction {
    type: number;
    version: number;
    senderPublicKey: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    amount: BigNumber;
    recipient: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    fee: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    timestamp: BigNumber;
    proofs: string[];
    id: string;
}

export class WavesCancelLeaseTransaction {
    type: number;
    version: number;
    senderPublicKey: string;
    leaseId: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    fee: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    timestamp: BigNumber;
    chainId: number;
    proofs: string[];
    id: string;
}

export class WavesIssueTransaction {
    type: number;
    version: number;
    senderPublicKey: string;
    name: string;
    description: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    quantity: BigNumber;
    script: string;
    decimals: number;
    reissuable: boolean;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    fee: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    timestamp: BigNumber;
    chainId: number;
    proofs: string[];
    id: string;
}

export class WavesAliasTransaction {
    type: number;
    version: number;
    senderPublicKey: string;
    alias: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    fee: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    timestamp: BigNumber;
    chainId: number;
    proofs: string[];
    id: string;
}

export class WavesBurnTransaction {
    type: number;
    version: number;
    senderPublicKey: string;
    assetId: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    quantity: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    fee: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    timestamp: BigNumber;
    chainId: number;
    proofs: string[];
    id: string;
}

export class WavesDataTransaction {
    type: number;
    version: number;
    senderPublicKey: string;
    data: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    fee: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    timestamp: BigNumber;
    proofs: string[];
    id: string;
}

export class WavesReissueTransaction {
    type: number;
    version: number;
    senderPublicKey: string;
    assetId: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    quantity: BigNumber;
    reissuable: boolean;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    fee: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    timestamp: BigNumber;
    chainId: number;
    proofs: string[];
    id: string;
}

export class WavesSetAssetScriptTransaction {
    type: number;
    version: number;
    senderPublicKey: string;
    assetId: string;
    chainId: number;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    fee: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    timestamp: BigNumber;
    proofs: string[];
    id: string;
    script: string;
}

export class WavesSetScriptTransaction {
    type: number;
    version: number;
    senderPublicKey: string;
    chainId: number;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    fee: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    timestamp: BigNumber;
    proofs: string[];
    id: string;
    script: string;
}

export class WavesSponsorshipTransaction {
    type: number;
    version: number;
    senderPublicKey: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    minSponsoredAssetFee: BigNumber;
    assetId: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    fee: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    timestamp: BigNumber;
    proofs: string[];
    id: string;
}

export class WavesMasspayTransfers {
    recipient: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    amount: BigNumber
}

export class WavesMassTransferTransaction {
    type: number;
    version: number;
    senderPublicKey: string;
    assetId: string;
    @Type(() => WavesMasspayTransfers)
    transfers: WavesMasspayTransfers[];
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    fee: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    timestamp: BigNumber;
    attachment: string;
    proofs: string[];
    id: string;
}

export class WavesInvokeCallArgs {
    type: string;
    value: string;
}

export class WavesInvokePayment {
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    amount: BigNumber;
    assetId: string;
}

export class WavesInvokeCall {
    function: string;
    @Type(() => WavesInvokeCallArgs)
    payment: WavesInvokeCallArgs[];
}

export class WavesInvokeTransaction {
    type: number;
    version: number;
    senderPublicKey: string;
    dApp: string;
    @Type(() => WavesInvokeCall)
    call: WavesInvokeCall;
    @Type(() => WavesInvokePayment)
    payment: WavesInvokePayment[];
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    fee: BigNumber;
    feeAssetId: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    timestamp: BigNumber;
    chainId: number;
    proofs: string[];
    id: string;
}


export class WavesExchangeOrderAssetPair {
    amountAsset: string;
    priceAsset: string;
}

export class WavesExchangeOrder {
    orderType: string;
    version: number;
    @Type(() => WavesExchangeOrderAssetPair)
    assetPair: WavesExchangeOrderAssetPair;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    price: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    amount: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    timestamp: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    expiration: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    matcherFee: BigNumber;
    matcherPublicKey: string;
    senderPublicKey: string;
    proofs: string[];
    id: string;
}

export class WavesExchangeTransaction {
    type: number;
    version: number;
    senderPublicKey: string;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    price: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    amount: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    buyMatcherFee: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    sellMatcherFee: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    fee: BigNumber;
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    timestamp: BigNumber;
    proofs: string[];
    id: string;
    @Type(() => WavesExchangeOrder)
    order1: WavesExchangeOrder;
    order2: WavesExchangeOrder;
}