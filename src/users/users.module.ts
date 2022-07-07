import { Module } from '@nestjs/common';
import dbSource from 'src/core/database/dbsource';
import { DbSourceProviders } from 'src/core/providers/dbsource.providers';
import { RepositoryProviders } from 'src/core/providers/repository.providers';
import { UserRepsitory } from './user.repository';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepsitory,
    ...RepositoryProviders,
    ...DbSourceProviders,
  ],
  exports: [UserService],
})
export class UsersModule {}
