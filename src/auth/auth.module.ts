import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';

@Module({
    imports: [DatabaseModule, JwtModule.register({
        secret: process.env.SECRET,
        signOptions: { expiresIn: '3600s' }
    })],
    controllers: [AuthController],
    providers: [AuthService, UserService],
    exports: [AuthService]
})
export class AuthModule {}