import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionModule } from './connection/connection.module';
import { VectordataprocessModule } from './features/vectordataprocess/vectordataprocess.module';

@Module({
  imports: [ConnectionModule, VectordataprocessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
