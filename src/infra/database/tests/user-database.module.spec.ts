import { Test, TestingModule } from '@nestjs/testing';
import { UserDbModule } from '../users/user-database.module';

describe('User Module', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [UserDbModule],
    }).compile();
  });

  afterAll(() => {
    module.close();
  });

  it('should be defined', async () => {
    expect(module).toBeDefined();
  });
});
