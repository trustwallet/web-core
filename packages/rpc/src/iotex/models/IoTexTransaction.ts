import 'reflect-metadata';
import { Type } from 'class-transformer';


class IoTexAction {
    actHash: string;
    blkHeight?: string;
}

export class IoTexTransaction {
    @Type(() => IoTexAction)
    actionInfo: IoTexAction[];
}
