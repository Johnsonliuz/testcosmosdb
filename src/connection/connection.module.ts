import { Module } from '@nestjs/common';
import { CosmosService } from './cosmos/cosmos.service';

@Module({
  providers: [CosmosService],
  exports: [CosmosService],
})
export class ConnectionModule {}
