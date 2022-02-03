import { Test } from '@nestjs/testing';
import { Connection, getConnection } from 'typeorm';
import { UserModule } from '../user.module';

describe('User Module', () => {
  let connection: Connection;
  afterAll(() => {
    connection = getConnection();
    connection.close();
  });

  it('should behave...', async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    expect(module).toBeDefined();
  });
});
