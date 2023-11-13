import { Test, TestingModule } from '@nestjs/testing';
import { VectordataprocessController } from './vectordataprocess.controller';

describe('VectordataprocessController', () => {
  let controller: VectordataprocessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VectordataprocessController],
    }).compile();

    controller = module.get<VectordataprocessController>(
      VectordataprocessController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
