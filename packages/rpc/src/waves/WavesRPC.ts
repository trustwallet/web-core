import { Query } from './Query';
import 'reflect-metadata';
import { NetworkError } from '../errors/network-error';
import axios, {AxiosResponse} from 'axios';
import { plainToClass } from 'class-transformer';
import { WavesCurrentHeight, WavesAddress, WavesAsset, WavesAssetsBalances }  from './models'
import * as Trx from './models/WavesTransaction'

export class WavesRPC {
    rpcUrl: string;

    constructor(rpcUrl: string) {
        this.rpcUrl = rpcUrl;
    }

    private query(): Query {
        return new Query(this.rpcUrl);
    }

    async getCurrentHeight(): Promise<WavesCurrentHeight> {
        let response = await axios.get(this.query().getCurrentHeight());
        return plainToClass(WavesCurrentHeight, response.data);
    }

    async getAddress(address: string): Promise<WavesAddress> {
        let response = await axios.get(this.query().getAddress(address));
        return plainToClass(WavesAddress, response.data);
    }

    async getAssetDetails(assetId: string): Promise<WavesAsset> {
        let response = await axios.get(this.query().getAssetDetails(assetId));
        return plainToClass(WavesAsset, response.data);
    }

    async getTransaction(id: string): Promise<any> {
        let response = await axios.get(this.query().getTransaction(id));
        return this.createWavesTransaction(response);
        return null;

    }

    async getAssetBalaces(address: string): Promise<WavesAssetsBalances> {
        let response = await axios.get(this.query().getAssetsBalances(address));
        return plainToClass(WavesAssetsBalances, response.data);
    }

    async getActiveLeasings(address: string): Promise<Trx.WavesLeaseTransaction[]> {
        let response = await axios.get(this.query().getActiveLeasings(address));
        return plainToClass(Trx.WavesLeaseTransaction, response.data as []);
    }

    async broadcastTransaction(data: string): Promise<any> {
        try {
            const url = this.query().broadcastTransaction();
            const response = await axios.post(url, data);
            return this.createWavesTransaction(response);
        } catch (error) {
            if (error.response) {
                throw new NetworkError(error.response.status, error.response.data);
            } else {
                throw error;
            }
        }
    }

    private async createWavesTransaction(response: AxiosResponse): Promise<any> {
        switch (response.data.type) {
            case 4:
                return plainToClass(Trx.WavesTransferTransaction, response.data);
                break;
            case 8:
                return plainToClass(Trx.WavesLeaseTransaction, response.data);
                break;
            case 9:
                return plainToClass(Trx.WavesCancelLeaseTransaction, response.data);
                break;
            case 3:
                return plainToClass(Trx.WavesIssueTransaction, response.data);
                break;
            case 10:
                return plainToClass(Trx.WavesAliasTransaction, response.data);
                break;
            case 6:
                return plainToClass(Trx.WavesBurnTransaction, response.data);
                break;
            case 12:
                return plainToClass(Trx.WavesDataTransaction, response.data);
                break;
            case 5:
                return plainToClass(Trx.WavesReissueTransaction, response.data);
                break;
            case 15:
                return plainToClass(Trx.WavesSetAssetScriptTransaction, response.data);
                break;
            case 13:
                return plainToClass(Trx.WavesSetScriptTransaction, response.data);
                break;
            case 14:
                return plainToClass(Trx.WavesSponsorshipTransaction, response.data);
                break;
            case 11:
                return plainToClass(Trx.WavesMassTransferTransaction, response.data);
                break;
            case 16:
                return plainToClass(Trx.WavesInvokeTransaction, response.data);
                break;
            case 7:
                return plainToClass(Trx.WavesExchangeTransaction, response.data);
                break;
        }
        return null;
    }


}
