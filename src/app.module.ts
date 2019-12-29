require('dotenv').config({ path: './.env' });
import { Module } from '@nestjs/common';

// Modules
import { DatabaseModule } from './database/database.module';
import { EmailModule } from './mailer/email.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { CampaingModule } from './campaing/campaing.module';

// Controllers
import { AppController } from './app.controller';

// Services
import { AppService } from './app.service';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, CampaingModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}