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

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      const connection = await mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true
      });
      return connection;
    }
  },
  {
    provide: 'UserModel',
    useFactory: (connection: mongoose.Connection) => connection.model<IUser>('users', UserSchema),
    inject: ['DATABASE_CONNECTION']
  },
  {
    provide: 'CampaingModel',
    useFactory: (connection: mongoose.Connection) => connection.model<ICampaing>('campaings', CampaingSchema),
    inject: ['DATABASE_CONNECTION']
  },
  {
    provide: 'CommentModel',
    useFactory: (connection: mongoose.Connection) => connection.model<IComment>('comment', CommentSchema),
    inject: ['DATABASE_CONNECTION']
  },
  {
    provide: 'ResponseModel',
    useFactory: (connection: mongoose.Connection) => connection.model<IResponse>('response', ResponseSchema),
    inject: ['DATABASE_CONNECTION']
  }
];