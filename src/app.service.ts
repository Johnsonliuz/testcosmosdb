import { Injectable } from '@nestjs/common';
import { CosmosService } from './connection/cosmos/cosmos.service';

@Injectable()
export class AppService {
  constructor(private readonly cosmosService: CosmosService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
