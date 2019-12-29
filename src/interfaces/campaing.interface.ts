import { Document } from 'mongoose';

export interface ICampaing extends Document {
    readonly shortName: string,
    readonly url: string,
    readonly status: string,
    readonly description: string,
    readonly deadline: string,
    readonly goal: number,
    readonly amountCollected: number,
    readonly donors: Array<any>,
    readonly owner: string,
    readonly comments: Array<any>,
    readonly totalLikes: number,
    readonly totalDislikes: number,
    readonly likesAndDislikes: Array<any>
}