import { Document } from 'mongoose';

export interface IUser extends Document {
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly creditCart: string,
    readonly password: string,
    readonly campaingsThatHelped: Array<any>
}