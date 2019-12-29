import { Document } from 'mongoose';

export interface IComment extends Document {
    owner: string,
    text: string,
    responses: Array<any>
}