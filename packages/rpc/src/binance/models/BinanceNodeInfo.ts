import 'reflect-metadata';
import { Type, Transform } from 'class-transformer';
import BigNumber from 'bignumber.js';
 
class NodeInfo {
    network: String
    listen_addr: String
    version: string
    channels: string
}

class SyncInfo {
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    latest_block_hash: BigNumber
    latest_app_hash: string
}

class ValidatorInfo {
    address: string
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    voting_power: BigNumber
    pub_key: number[]

}

class ProtocolVersion {
    ProtocolVersion: number
    app: number
    block: number
}

export class BinanceNodeInfo {
    @Type(() => NodeInfo)
    node_info: NodeInfo
    @Type(() => SyncInfo)
    sync_info: SyncInfo
    @Type(() => ValidatorInfo)
    validator_info : ValidatorInfo
    @Type(() => ProtocolVersion)
    protocol_version: ProtocolVersion

    chainID(): String {
        return this.node_info.network
    }
}
