import { Document } from 'mongoose';
import { IDonor } from './donor.interface';
import { IComment } from './comment.interface';
import { ILikeDislike } from './likeDislike.interface';

export interface ICampaing extends Document {
    readonly shortName: string,
    readonly url: string,
    readonly status: string,
    readonly description: string,
    readonly deadline: string,
    readonly goal: number,
    readonly amountCollected: number,
    readonly donors: Array<IDonor>,
    readonly owner: string,
    readonly comments: Array<IComment>,
    readonly totalLikes: number,
    readonly totalDislikes: number,
    readonly likesAndDislikes: Array<ILikeDislike>
}