import { Module } from '@nestjs/common';
import { VectordataprocessService } from './vectordataprocess.service';
import { VectordataprocessController } from './vectordataprocess.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MulterExcel } from 'src/utils/multer.service';
import { ExcelService } from 'src/utils/excel.service';
import { ConnectionModule } from 'src/connection/connection.module';

@Module({
  providers: [VectordataprocessService, ExcelService],
  controllers: [VectordataprocessController],
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: MulterExcel.destination,
        filename: MulterExcel.filenameHandler,
      }),
    }),
    ConnectionModule,
  ],
  exports: [VectordataprocessService],
})
export class VectordataprocessModule {}
