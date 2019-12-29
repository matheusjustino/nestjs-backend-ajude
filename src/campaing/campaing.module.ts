import { Module } from '@nestjs/common';
import { CampaingController } from './campaing.controller';
import { CampaingService } from './campaing.service';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [CampaingController],
    providers: [CampaingService],
    exports: [CampaingService, DatabaseModule]
})
export class CampaingModule {}
