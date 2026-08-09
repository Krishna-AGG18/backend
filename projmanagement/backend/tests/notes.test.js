import request from 'supertest';
import app from '../src/app.js';
import { setupUser } from './helpers.js';

describe('Note Routes', () => {
  let adminToken;
  let memberToken;
  let projectId;
  
  beforeEach(async () => {
    const adminAuth = await setupUser();
    adminToken = adminAuth.token;

    const memberAuth = await setupUser();
    memberToken = memberAuth.token;

    const projectRes = await request(app)
      .post('/api/v1/projects')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Notes Project' });
    projectId = projectRes.body.data._id;

    await request(app)
      .post(`/api/v1/projects/${projectId}/members`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ email: memberAuth.user.email, role: 'member' });
  });

  describe('POST /api/v1/notes/:projectId', () => {
    it('should allow admin to create a note', async () => {
      const res = await request(app)
        .post(`/api/v1/notes/${projectId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Test Note',
          content: 'Note content',
          tags: ['test']
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBeTruthy();
    });

    it('should deny member from creating a note', async () => {
      const res = await request(app)
        .post(`/api/v1/notes/${projectId}`)
        .set('Authorization', `Bearer ${memberToken}`)
        .send({
          title: 'Hacked Note',
          content: 'Note content',
        });

      expect(res.statusCode).toEqual(403);
    });
  });
});
