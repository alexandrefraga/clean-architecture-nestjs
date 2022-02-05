import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';

describe('User Module', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  afterAll(() => {
    module.close();
  });

  it('should be defined', async () => {
    expect(module).toBeDefined();
  });
});
