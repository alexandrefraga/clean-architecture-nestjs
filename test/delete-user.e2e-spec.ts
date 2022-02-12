import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/user/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/infra/database/users/user.entity';

describe('Delete User (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let users: User[];

  const mockUserRepository = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findOne: jest.fn().mockImplementation((data, _) => {
      const condition = Object.entries(data)[0];
      return users.find((user) => user[condition[0]] === condition[1]);
    }),
    softDelete: jest.fn().mockReturnValue({ affected: 1 }),
  };

  const fakeUser = new User(
    'Alexandre',
    '11999888777',
    'alexandre@mail.com',
    '123456',
  );

  beforeEach(async () => {
    users = [];
    moduleFixture = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(moduleFixture).toBeDefined();
  });

  it('should return 400 if user not found', () => {
    return request(app.getHttpServer())
      .delete(`/user/${fakeUser.id}`)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe('user not found');
      });
  });

  it('should delete user', () => {
    users.push(fakeUser);

    return request(app.getHttpServer())
      .delete(`/user/${fakeUser.id}`)
      .expect(200);
  });
});
