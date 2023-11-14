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

  // 刪除容器
  async deleteContainer(databaseId: string, containerId: string) {
    const container = await this.cosmosService.deleteContainer(
      databaseId,
      containerId,
    );
    return container;
  }

  // 設計容器的吞吐量

  // 新增資料
  async createData(databaseId: string, containerId: string, data: any) {
    const result = await this.cosmosService.createItem(
      databaseId,
      containerId,
      data,
    );
    return result;
  }
}
