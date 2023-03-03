import { Test, TestingModule } from '@nestjs/testing';
import { OrtailService } from './ortail.service';

describe('OrtailService', () => {
  let service: OrtailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrtailService],
    }).compile();

    service = module.get<OrtailService>(OrtailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
