import { Test, TestingModule } from '@nestjs/testing';
import { VectordataprocessService } from './vectordataprocess.service';

describe('VectordataprocessService', () => {
  let service: VectordataprocessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VectordataprocessService],
    }).compile();

    service = module.get<VectordataprocessService>(VectordataprocessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
