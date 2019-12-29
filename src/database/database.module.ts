import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { RepositoryService } from './repository.service';

@Module({
  providers: [...databaseProviders, RepositoryService],
  exports: [...databaseProviders, RepositoryService],
})
export class DatabaseModule {}