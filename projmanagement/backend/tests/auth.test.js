import request from 'supertest';
import app from '../src/app.js';
import { User } from '../src/models/user.models.js';

describe('Auth Routes', () => {
  const testUser = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    fullName: 'Test User',
  };

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send(testUser);

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBeTruthy();
      expect(res.body.data.user.email).toEqual(testUser.email);
    });

    it('should not register a user with an existing email', async () => {
      await request(app).post('/api/v1/auth/register').send(testUser);
      
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({ ...testUser, username: 'another' });

      expect(res.statusCode).toEqual(409); // Conflict
    });
  });

  describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
      await request(app).post('/api/v1/auth/register').send(testUser);
    });

    it('should login a user with correct credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.accessToken).toBeDefined();
    });

    it('should fail with incorrect password', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword',
        });

      expect(res.statusCode).toEqual(400);
    });
  });
});
