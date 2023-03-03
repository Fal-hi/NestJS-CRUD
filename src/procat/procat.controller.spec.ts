import { Test, TestingModule } from '@nestjs/testing';
import { ProcatController } from './procat.controller';
import { ProcatService } from './procat.service';

describe('ProcatController', () => {
  let controller: ProcatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcatController],
      providers: [ProcatService],
    }).compile();

    controller = module.get<ProcatController>(ProcatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
