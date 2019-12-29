require('dotenv').config({ path: './.env' });
import { Module } from '@nestjs/common';

// Modules
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { CampaingModule } from './campaing/campaing.module';

// Controllers
import { AppController } from './app.controller';
import { CampaingController } from './campaing/campaing.controller';

// Services
import { AppService } from './app.service';
import { CampaingService } from './campaing/campaing.service';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, CampaingModule],
  controllers: [AppController, CampaingController],
  providers: [AppService, CampaingService],
})
export class AppModule {}