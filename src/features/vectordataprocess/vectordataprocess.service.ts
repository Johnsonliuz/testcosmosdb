import { Injectable } from '@nestjs/common';
import { CosmosService } from 'src/connection/cosmos/cosmos.service';

@Injectable()
export class VectordataprocessService {
  constructor(private readonly cosmosService: CosmosService) {}

  // 新建資料庫
  async createDatabase(databaseId: string) {
    const database = await this.cosmosService.createDatabase(databaseId);
    return database;
  }

  // 新建容器
  async createContainer(databaseId: string, containerId: string) {
    const container = await this.cosmosService.createContainer(
      databaseId,
      containerId,
    );
    return container;
  }
}
