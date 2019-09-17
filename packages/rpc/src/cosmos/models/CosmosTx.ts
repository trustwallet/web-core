import { Transform, Type } from 'class-transformer';
import { CosmosAmount } from './CosmosAmount';

export enum CosmosTxInternalType {
    NONE,
    DELEGATE,
    UNDELEGATE,
}

export enum CosmosTxTagAction {
    NONE,
    ACTION,
    DELEGATOR,
    DESTINATION_VALIDATOR,
}

export class CosmosTxInternalMsgValue {
    delegator_address: string;
    validator_address: string;

    @Type(() => CosmosAmount)
    amount: CosmosAmount;
}

export class CosmosTxInternalMsg {
    @Transform(value => {
        switch (value) {
            case 'cosmos-sdk/MsgUndelegate':
                return CosmosTxInternalType.UNDELEGATE;
            case 'cosmos-sdk/MsgDelegate':
                return CosmosTxInternalType.DELEGATE;
            default:
                return CosmosTxInternalType.NONE;
        }
    })
    type: CosmosTxInternalType;

    @Type(() => CosmosTxInternalMsgValue)
    value: CosmosTxInternalMsgValue;
}

export class CosmosTxInternalValue {
    @Type(() => CosmosTxInternalMsg)
    msg: CosmosTxInternalMsg[];
}

export class CosmosTxInternalFee {
    amount: {
        denom: string;
        amount: string;
    }[];
    gas: string;
}

export class CosmosTxInternal {
    type: string;

    @Type(() => CosmosTxInternalValue)
    value: CosmosTxInternalValue;

    @Type(() => CosmosTxInternalFee)
    fee: CosmosTxInternalFee;

    memo: string;
}

export class CosmosTxLog {
    msg_index: string;
    success: boolean;
    log: string;
}

export class CosmosTxTag {
    @Transform(value => {
        switch (value) {
            case 'action':
                return CosmosTxTagAction.ACTION;
            case 'delegator':
                return CosmosTxTagAction.DELEGATOR;
            case 'destination-validator':
                return CosmosTxTagAction.DESTINATION_VALIDATOR;
            default:
                return CosmosTxTagAction.NONE;
        }
    })
    key: CosmosTxTagAction;

    @Transform(value => {
        switch (value) {
            case 'action':
                return CosmosTxTagAction.ACTION;
            case 'delegator':
                return CosmosTxTagAction.DELEGATOR;
            case 'destination-validator':
                return CosmosTxTagAction.DESTINATION_VALIDATOR;
            default:
                return CosmosTxTagAction.NONE;
        }
    })
    value: string;
}

export class CosmosTx {
    height: string;
    txhash: string;
    raw_log: string;

    @Type(() => CosmosTxLog)
    logs: CosmosTxLog[];

    gas_wanted: string;
    gas_used: string;

    @Type(() => CosmosTxTag)
    tags: CosmosTxTag[];

    @Type(() => CosmosTxInternal)
    tx: CosmosTxInternal;

    @Type(() => Date)
    timestamp: Date;
}
