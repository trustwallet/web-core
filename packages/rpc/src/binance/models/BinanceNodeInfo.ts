import 'reflect-metadata';
import { Type, Transform, Expose } from 'class-transformer';
import BigNumber from 'bignumber.js';

class NodeInfo {
    network: string;
    @Expose({ name: 'listen_addr' })
    listenAddr: string;
    version: string;
    channels: string;
}

class SyncInfo {
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    @Expose({ name: 'latest_block_hash' })
    latestBlockHash: BigNumber;
    @Expose({ name: 'latest_app_hash' })
    latestAppHash: string;
}

class ValidatorInfo {
    address: string;
    @Expose({ name: 'voting_power' })
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    votingPower: BigNumber;
    @Expose({ name: 'pub_key' })
    pubKey: number[];
}

export class BinanceNodeInfo {
    @Expose({ name: 'node_info' })
    @Type(() => NodeInfo)
    nodeInfo: NodeInfo;
    @Expose({ name: 'sync_info' })
    @Type(() => SyncInfo)
    syncInfo: SyncInfo;
    @Expose({ name: 'validator_info' })
    @Type(() => ValidatorInfo)
    validatorInfo: ValidatorInfo;

    chainID(): string {
        return this.nodeInfo.network;
    }
}
