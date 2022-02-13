import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getManager } from 'typeorm';
import { AppModule } from './app.module';
import { User } from './infra/database/entities/user.entity';

describe('User Module', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue({})
      .compile();
  });

  afterAll(() => {
    module.close;
    getManager().connection.close();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
