import { Document } from 'mongoose';

export interface IResponse extends Document {
    owner: string,
    text: string
}