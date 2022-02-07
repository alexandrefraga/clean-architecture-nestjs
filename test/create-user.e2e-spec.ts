import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/user/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/infra/database/users/user.entity';
import { CreateUserDto } from '../src/user/dtos/create-user-dto';

describe('Create User (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let users: User[];

  const mockUserRepository = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findOne: jest.fn().mockImplementation((data, _) => {
      const condition = Object.entries(data)[0];
      return users.find((user) => user[condition[0]] === condition[1]);
    }),
    create: jest
      .fn()
      .mockImplementation(({ name, phone, email, password }: CreateUserDto) => {
        return { id: 'userId', name, phone, email, password };
      }),
    save: jest.fn().mockImplementation((user: User) => {
      users.push(user);
    }),
  };

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

  it('should creation an user', () => {
    return request(app.getHttpServer())
      .post('/user/create')
      .send({
        name: 'Alexandre',
        phone: '11999888777',
        email: 'alexandre@mail.com',
        password: '123456',
      })
      .expect(201);
  });

  it('should return 400 if e-mail already registered', () => {
    users.push(
      new User('Alexandre', '11999888777', 'alexandre@mail.com', '123456'),
    );
    return request(app.getHttpServer())
      .post('/user/create')
      .send({
        name: 'Alexandre',
        phone: '11999888777',
        email: 'alexandre@mail.com',
        password: '123456',
      })
      .expect(400);
  });
});
