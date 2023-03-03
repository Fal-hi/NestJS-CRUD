import { Test, TestingModule } from '@nestjs/testing';
import { ProcatService } from './procat.service';

describe('ProcatService', () => {
  let service: ProcatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcatService],
    }).compile();

    service = module.get<ProcatService>(ProcatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
