import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { EmailModule } from '../mailer/email.module';

import { authConfig } from '../config/configs';

@Module({
    imports: [DatabaseModule, JwtModule.register({
        secret: authConfig.secret,
        signOptions: authConfig.signOptions
    }), EmailModule],
    controllers: [AuthController],
    providers: [AuthService, UserService],
    exports: [AuthService]
})
export class AuthModule {}