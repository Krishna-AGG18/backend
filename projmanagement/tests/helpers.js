import request from 'supertest';
import app from '../src/app.js';
import { User } from '../src/models/user.models.js';

export const setupUser = async () => {
  const user = {
    username: `user_${Date.now()}`,
    email: `test${Date.now()}@example.com`,
    password: 'password123',
    fullName: 'Test User',
  };

  const regRes = await request(app).post('/api/v1/auth/register').send(user);
  if (regRes.statusCode !== 201) console.error('Register failed:', regRes.body);

  const res = await request(app).post('/api/v1/auth/login').send({
    email: user.email,
    password: user.password,
  });
  
  if (res.statusCode !== 200) console.error('Login failed:', res.body);

  return { user, token: res.body?.data?.accessToken };
};
