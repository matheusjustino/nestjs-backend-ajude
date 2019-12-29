import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

// Interfaces
import { IUser } from '../interfaces/User.interface';
import { ICampaing } from '../interfaces/campaing.interface';
import { IComment } from '../interfaces/comment.interface';
import { IResponse } from '../interfaces/response.interface';

@Injectable()
export class RepositoryService {
    constructor(
        @Inject('UserModel') private readonly userModel: Model<IUser>,
        @Inject('CampaingModel') private readonly campaingModel: Model<ICampaing>,
        @Inject('CommentModel') private readonly commentModel: Model<IComment>,
        @Inject('ResponseModel') private readonly responseModel: Model<IResponse>
    ) {}

    get Users(): Model<IUser> {
        return this.userModel;
    }

    get Campaings(): Model<ICampaing> {
        return this.campaingModel;
    }

    get Comments(): Model<IComment> {
        return this.commentModel;
    }

    get Responses(): Model<IResponse> {
        return this.responseModel;
    }
}