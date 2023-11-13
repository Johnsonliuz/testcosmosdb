import { Controller, Post, Body } from '@nestjs/common';
import { VectordataprocessService } from './vectordataprocess.service';
import { ExcelService } from 'src/utils/excel.service';

@Controller('vectordataprocess')
export class VectordataprocessController {
  constructor(
    private readonly vectordataprocessService: VectordataprocessService,
    private readonly excelService: ExcelService,
  ) {}

  // 新建資料庫
  @Post('createDatabase') // http://localhost:3000/vectordataprocess/createDatabase
  // 從前端接收資料庫名稱，這邊會從Query取得
  async createDatabase(@Body('databaseName') nmae: string) {
    const databaseName = nmae;
    const database = await this.vectordataprocessService.createDatabase(
      databaseName,
    );
    return database.id;
  }

  // 新建容器
  @Post('createContainer') // http://localhost:3000/vectordataprocess/createContainer
  // 從前端接收容器名稱，這邊會從Body取得
  //   {
  //     "databaseName":"test",
  //     "containerName":"item"
  //   }
  async createContainer(
    @Body('databaseName') databaseName: string,
    @Body('containerName') containerName: string,
  ) {
    const container = await this.vectordataprocessService.createContainer(
      databaseName,
      containerName,
    );
    return container.id;
  }

  // 新增資料
  @Post('createData') // http://localhost:3000/vectordataprocess/createData
  // 從前端接收資料，這邊會從Body取得
  async createData(
    @Body('databaseName') databaseName: string,
    @Body('containerName') containerName: string,
    @Body('data') data: any,
  ) {
    const result = await this.vectordataprocessService.createData(
      databaseName,
      containerName,
      data,
    );
    return result;
  }
}
