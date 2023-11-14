import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { VectordataprocessService } from './vectordataprocess.service';
import { FileInterceptor } from '@nestjs/platform-express';
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

  // 一次性更新所有資料
  // 先刪除容器，再建立容器，再新增資料
  @UseInterceptors(FileInterceptor('fieldname'))
  @Post('updateAllData') // http://localhost:3000/vectordataprocess/updateAllData
  // 從前端接收資料，這邊會從Body取得
  async updateAllData(
    @Body('databaseName') databaseName: string,
    @Body('containerName') containerName: string,
    @Body('data') data: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { newQAArr, newCalssArr, newQArr } =
      await this.excelService.uploadQAExcel(file);
    console.log(newQAArr);
    console.log(newCalssArr);
    console.log(newQArr);
    console.log(databaseName);
    console.log(containerName);
    console.log(data);

    // // 刪除容器
    // const deleteContainer = await this.vectordataprocessService.deleteContainer(
    //   databaseName,
    //   containerName,
    // );
    // console.log(deleteContainer);
    // // 檢查刪除操作是否成功
    // if (deleteContainer.error) {
    //   // 如果刪除失敗，返回錯誤訊息
    //   return { error: 'Failed to delete container.' };
    // }
    // // 建立容器
    // const createContainer = await this.vectordataprocessService.createContainer(
    //   databaseName,
    //   containerName,
    // );
    // console.log(createContainer);
    // // 寫入資料
    // const result = await this.vectordataprocessService.createData(
    //   databaseName,
    //   containerName,
    //   data,
    // );
    // return result;
  }
}
