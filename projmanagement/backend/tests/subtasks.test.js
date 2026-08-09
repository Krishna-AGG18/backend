import request from 'supertest';
import app from '../src/app.js';
import { setupUser } from './helpers.js';

describe('Subtask Routes', () => {
  let adminToken;
  let memberToken;
  let projectId;
  let taskId;
  
  beforeEach(async () => {
    const adminAuth = await setupUser();
    adminToken = adminAuth.token;

    const memberAuth = await setupUser();
    memberToken = memberAuth.token;

    const projectRes = await request(app)
      .post('/api/v1/projects')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Subtask Project' });
    projectId = projectRes.body.data._id;

    await request(app)
      .post(`/api/v1/projects/${projectId}/members`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ email: memberAuth.user.email, role: 'member' });

    const taskRes = await request(app)
      .post(`/api/v1/tasks/${projectId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ title: 'Parent Task', status: 'todo', priority: 'medium' });
    taskId = taskRes.body.data._id;
  });

  describe('POST /api/v1/tasks/:projectId/t/:taskId/subtasks', () => {
    it('should allow admin to create a subtask', async () => {
      const res = await request(app)
        .post(`/api/v1/tasks/${projectId}/t/${taskId}/subtasks`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ title: 'First Subtask' });

      expect(res.statusCode).toEqual(201);
      expect(res.body.data.title).toEqual('First Subtask');
    });

    it('should deny member from creating a subtask', async () => {
      const res = await request(app)
        .post(`/api/v1/tasks/${projectId}/t/${taskId}/subtasks`)
        .set('Authorization', `Bearer ${memberToken}`)
        .send({ title: 'Hacked Subtask' });

      expect(res.statusCode).toEqual(403);
    });
  });

  describe('PUT /api/v1/tasks/:projectId/st/:subTaskId', () => {
    let subTaskId;
    
    beforeEach(async () => {
      const res = await request(app)
        .post(`/api/v1/tasks/${projectId}/t/${taskId}/subtasks`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ title: 'Subtask to Update' });
      subTaskId = res.body.data._id;
    });

    it('should allow member to update subtask status', async () => {
      const res = await request(app)
        .put(`/api/v1/tasks/${projectId}/st/${subTaskId}`)
        .set('Authorization', `Bearer ${memberToken}`)
        .send({ isCompleted: true });

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.isCompleted).toBe(true);
    });
  });
});
