import BigNumber from 'bignumber.js';
import { Transform, Type } from 'class-transformer';

class Output {
    @Transform(value => new BigNumber(value), { toClassOnly: true })
    value: BigNumber;
    addresses: string[];
    hex: string;

    get address(): string | null {
        return this.addresses.length > 0 ? this.addresses[0] : null;
    }
}

class TokenTransfers {
    type: string;
    from: string;
    to: string;
    token: string;
    name: string;
    symbol: string;
    decimals: number;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    value: BigNumber;
}

class EthereumSpecific {
    status: number;
    nonce: number;
    gasLimit: number;
    gasUsed: number;

    @Transform(value => new BigNumber(value), { toClassOnly: true })
    gasPrice: BigNumber;
}

export class EthereumTransactionDetail {
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

    @Type(() => TokenTransfers)
    tokenTransfers: TokenTransfers[];

    @Type(() => EthereumSpecific)
    ethereumSpecific: EthereumSpecific;

    get from(): string[] {
        return EthereumTransactionDetail.txAddresses(this.vin);
    }

    get to(): string[] {
        return EthereumTransactionDetail.txAddresses(this.vout);
    }

    private static txAddresses(array: Output[]): string[] {
        return array
            .reduce((acc, output) => [...acc, ...output.addresses], [] as string[]) // Flatmap
            .reduce((acc, addr) => (acc.indexOf(addr) >= 0 ? [...acc, addr] : acc), [] as string[]); // Unique
    }
}
