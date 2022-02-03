import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '../user.module';

describe('User Module', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();
  });

  afterAll(() => {
    module.close();
  });

  it('should be defined', async () => {
    expect(module).toBeDefined();
  });
});
