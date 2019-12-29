import { Document } from 'mongoose';

export interface UserLogin extends Document {
    readonly email: string,
    readonly password: string
}