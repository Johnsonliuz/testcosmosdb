import { Injectable } from '@nestjs/common';
import { CosmosClient, Database, Container } from '@azure/cosmos';

@Injectable()
export class CosmosService {
  private client: CosmosClient;
  // private database: Database;
  // private container: Container;

  constructor() {
    const endpoint = 'https://customerdb.documents.azure.com:443/';
    const key =
      'ztQQi8RoyeVvYBNxsGlokHqzaEf3ziwREhdNc2cjx47ldV3voRRGYF7uH0397r2psLZsuaCgVlF8ACDbhXmr5Q==';

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
      .containers.createIfNotExists({ id: containerId });
    return container;
  }
}
