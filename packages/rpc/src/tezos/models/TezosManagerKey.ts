import 'reflect-metadata';
import { Expose } from 'class-transformer';


export class TezosManagerKey {
    @Expose({name:"manager"})
    key: String
}