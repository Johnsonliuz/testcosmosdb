import { Injectable } from '@nestjs/common';
import { CosmosClient, Database, Container } from '@azure/cosmos';

@Injectable()
export class CosmosService {
  private client: CosmosClient;
  // private database: Database;
  // private container: Container;
  private partitionKey: any;

  constructor() {
    const endpoint = 'https://customerdb.documents.azure.com:443/';
    const key =
      'ztQQi8RoyeVvYBNxsGlokHqzaEf3ziwREhdNc2cjx47ldV3voRRGYF7uH0397r2psLZsuaCgVlF8ACDbhXmr5Q==';
    this.partitionKey = { kind: 'Hash', paths: ['/partitionKey'] };

    this.client = new CosmosClient({ endpoint, key });
    // this.database = this.client.database('YourDatabaseId');
    // this.container = this.database.container('YourContainerId');
  }

  // 要建立資料庫調用此方法
  async createDatabase(databaseId: string): Promise<Database> {
    const { database } = await this.client.databases.createIfNotExists({
      id: databaseId,
    });
    return database;
  }

  // 要建立容器調用此方法
  async createContainer(
    databaseId: string,
    containerId: string,
  ): Promise<Container> {
    const { container } = await this.client
      .database(databaseId)
      .containers.createIfNotExists({
        id: containerId,
        partitionKey: this.partitionKey,
      });
    return container;
  }

  // 要建立項目調用此方法
  async createItem(
    databaseId: string,
    containerId: string,
    item: any,
  ): Promise<any> {
    const { resource } = await this.client
      .database(databaseId)
      .container(containerId)
      .items.upsert(item);
    return resource;
  }

  // 要查詢項目調用此方法
  async readItem(containerId: string, itemId: string): Promise<any> {
    const { resource } = await this.client
      .database('YourDatabaseId')
      .container(containerId)
      .item(itemId)
      .read();
    return resource;
  }

  async queryItems(containerId: string, query: string): Promise<any[]> {
    const { resources } = await this.client
      .database('YourDatabaseId')
      .container(containerId)
      .items.query(query)
      .fetchAll();
    return resources;
  }

  // 要更新項目調用此方法
  async updateItem(
    containerId: string,
    itemId: string,
    newItem: any,
  ): Promise<any> {
    const { resource } = await this.client
      .database('YourDatabaseId')
      .container(containerId)
      .item(itemId)
      .replace(newItem);
    return resource;
  }

  // 要刪除項目調用此方法
  async deleteItem(containerId: string, itemId: string): Promise<any> {
    const { resource } = await this.client
      .database('YourDatabaseId')
      .container(containerId)
      .item(itemId)
      .delete();
    return resource;
  }
}
