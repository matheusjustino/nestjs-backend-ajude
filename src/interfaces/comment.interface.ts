import { Document } from 'mongoose';
import { IResponse } from './response.interface';

export interface IComment extends Document {
    owner: string,
    text: string,
    responses: Array<IResponse>
}