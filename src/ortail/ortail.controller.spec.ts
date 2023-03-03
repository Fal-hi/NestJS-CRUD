import { Test, TestingModule } from '@nestjs/testing';
import { OrtailController } from './ortail.controller';
import { OrtailService } from './ortail.service';

describe('OrtailController', () => {
  let controller: OrtailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrtailController],
      providers: [OrtailService],
    }).compile();

    controller = module.get<OrtailController>(OrtailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
