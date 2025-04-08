import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../../src/app.module';

describe('Auth Resolver (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should login successfully and return an access token', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            login(email: "test2@2.com", password: "123") {
              accessToken
            }
          }
        `,
      })
      .expect(200);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.data.login.accessToken).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    accessToken = response.body.data.login.accessToken;
  });

  it('should logout successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
          mutation {
            logout
          }
        `,
      });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.data.logout).toBe(true);
  });

  afterAll(async () => {
    await app.close();
  });
});
