import request from 'supertest';
import app from '../src/app.js';
import { setupUser } from './helpers.js';

describe('Member Routes', () => {
  let adminToken;
  let projectId;
  let testUser;
  
  beforeEach(async () => {
    const adminAuth = await setupUser();
    adminToken = adminAuth.token;

    const newAuth = await setupUser();
    testUser = newAuth.user;

    const projectRes = await request(app)
      .post('/api/v1/projects')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Member Project' });
    projectId = projectRes.body.data._id;
  });

  describe('POST /api/v1/projects/:projectId/members', () => {
    it('should add a new member', async () => {
      const res = await request(app)
        .post(`/api/v1/projects/${projectId}/members`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          email: testUser.email,
          role: 'member'
        });

      if (res.statusCode !== 201) console.error('Add member failed:', res.body);

      expect(res.statusCode).toEqual(201);
      
      const getRes = await request(app)
        .get(`/api/v1/projects/${projectId}/members`)
        .set('Authorization', `Bearer ${adminToken}`);
        
      expect(getRes.body.data.length).toEqual(2); // Admin + new member
    });
  });
});
