import { Module } from '@nestjs/common';
import { MailerModule } from '@nest-modules/mailer';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { EmailModule } from '../mailer/email.module';

import { CampaingModule } from '../campaing/campaing.module';

@Module({
    imports: [DatabaseModule, AuthModule, CampaingModule, EmailModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}