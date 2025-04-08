import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import request from 'supertest';
import { PrismaService } from '../../../src/prisma/prisma.service';

describe('Auth resolver register (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get(PrismaService);
    await app.init();
  });

  afterEach(async () => {
    const userEmail = 'test1FromJest@test.com'; // email from user i want to delete
    // get userId
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail, //find user by email
      },
    });

    if (user) {
      // delete auth first because of foreign key between auth and user
      await prisma.auth.deleteMany({
        where: {
          userId: user.id, // use reovered id
        },
      });
    }
    //finally can delete user from user table
    await prisma.user.delete({
      where: {
        id: user.id, // delete from id user
      },
    });
  });

  it('should create a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
            mutation {
              register(email: "test1FromJest@test.com", name: "user1FromTestJest", password: "123") {
                id
                userId
                user {
                  id
                  email
                  name
                }
              }
            }
          `,
      })
      .expect(200);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const user = response.body?.data?.register?.user;
    // expect(user).toBeDefined();
    // expect(response.body.data.register.user.email).toBe(
    //   'test1FromJest@test.com',
    // );
    // expect(response.body.data.register.user.name).toBe('user2FromTestJest');
    expect(user).toMatchObject({
      email: 'test1FromJest@test.com',
      name: 'user1FromTestJest',
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
