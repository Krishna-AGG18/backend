import request from 'supertest';
import app from '../src/app.js';
import { setupUser } from './helpers.js';

describe('Task Routes', () => {
  let adminToken;
  let memberToken;
  let projectId;
  
  beforeEach(async () => {
    const adminAuth = await setupUser();
    adminToken = adminAuth.token;

    const memberAuth = await setupUser();
    memberToken = memberAuth.token;

    // Create a project as admin
    const projectRes = await request(app)
      .post('/api/v1/projects')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Task Project' });
    projectId = projectRes.body.data._id;

    // Add member to project
    await request(app)
      .post(`/api/v1/projects/${projectId}/members`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ email: memberAuth.user.email, role: 'member' });
  });

  describe('POST /api/v1/tasks/:projectId', () => {
    it('should allow admin to create a task', async () => {
      const res = await request(app)
        .post(`/api/v1/tasks/${projectId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ title: 'New Task', description: 'Task desc', status: 'todo' });

      if (res.statusCode !== 201) console.error('Task error:', res.body);

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBeTruthy();
      expect(res.body.data.title).toEqual('New Task');
    });

    it('should deny member from creating a task', async () => {
      const res = await request(app)
        .post(`/api/v1/tasks/${projectId}`)
        .set('Authorization', `Bearer ${memberToken}`)
        .send({ title: 'Hacked Task', status: 'todo' });

      expect(res.statusCode).toEqual(403);
    });
  });

  describe('GET /api/v1/tasks/:projectId/t/:taskId', () => {
    it('should return task with aggregation fields', async () => {
      const createRes = await request(app)
        .post(`/api/v1/tasks/${projectId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ title: 'Task to fetch' });
        
      const taskId = createRes.body.data._id;

      const getRes = await request(app)
        .get(`/api/v1/tasks/${projectId}/t/${taskId}`)
        .set('Authorization', `Bearer ${memberToken}`); // Member can read

      expect(getRes.statusCode).toEqual(200);
      expect(getRes.body.data.title).toEqual('Task to fetch');
      // Subtasks array should exist due to aggregation
      expect(getRes.body.data.subtasks).toBeInstanceOf(Array);
    });
  });
});
