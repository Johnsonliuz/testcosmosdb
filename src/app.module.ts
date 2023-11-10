import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionModule } from './connection/connection.module';
import { CosmosService } from './cosmos/cosmos.service';

@Module({
  imports: [ConnectionModule],
  controllers: [AppController],
  providers: [AppService, CosmosService],
})
export class AppModule {}
