import { Transform } from 'class-transformer';
import { Hex } from '@trustwallet/types';

export class TronBroadcastResult {
    result?: boolean;
    @Transform(value => new TextDecoder("utf-8").decode(Hex.fromHex(value)), { toClassOnly: true})
    message?: string;
    code?: string;
}
