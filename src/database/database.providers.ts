import * as mongoose from 'mongoose';
// Schemas
import UserSchema from './schemas/User.schema';
import CampaingSchema from './schemas/campaing.schema';
import CommentSchema from './schemas/comment.schema';
import ResponseSchema from './schemas/response.schema';
// Interfaces
import { IUser } from '../interfaces/User.interface';
import { ICampaing } from '../interfaces/campaing.interface';
import { IComment } from '../interfaces/comment.interface';
import { IResponse } from '../interfaces/response.interface';

import { databaseConfig } from '../config/configs';

export const databaseProviders = [
  {
    provide: databaseConfig.provide,
    useFactory: async (): Promise<typeof mongoose> => {
      const connection = await mongoose.connect(databaseConfig.dbUrl, databaseConfig.options);
      return connection;
    }
  },
  {
    provide: 'UserModel',
    useFactory: (connection: mongoose.Connection) => connection.model<IUser>('users', UserSchema),
    inject: [databaseConfig.provide]
  },
  {
    provide: 'CampaingModel',
    useFactory: (connection: mongoose.Connection) => connection.model<ICampaing>('campaings', CampaingSchema),
    inject: [databaseConfig.provide]
  },
  {
    provide: 'CommentModel',
    useFactory: (connection: mongoose.Connection) => connection.model<IComment>('comment', CommentSchema),
    inject: [databaseConfig.provide]
  },
  {
    provide: 'ResponseModel',
    useFactory: (connection: mongoose.Connection) => connection.model<IResponse>('response', ResponseSchema),
    inject: [databaseConfig.provide]
  }
];