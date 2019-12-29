import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

import { CampaingModule } from '../campaing/campaing.module';

@Module({
    imports: [DatabaseModule, AuthModule, CampaingModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService, DatabaseModule]
})
export class UserModule {}