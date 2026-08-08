import request from 'supertest';
import app from '../src/app.js';
import { setupUser } from './helpers.js';

describe('Project Routes', () => {
  let token;
  
  beforeEach(async () => {
    const auth = await setupUser();
    token = auth.token;
  });

  describe('POST /api/v1/projects', () => {
    it('should create a project successfully', async () => {
      const res = await request(app)
        .post('/api/v1/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test Project',
          description: 'A project for testing',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBeTruthy();
      expect(res.body.data.name).toEqual('Test Project');
    });

    it('should fail if unauthenticated', async () => {
      const res = await request(app)
        .post('/api/v1/projects')
        .send({
          name: 'Test Project',
        });

      expect(res.statusCode).toEqual(401);
    });
  });

  describe('GET /api/v1/projects', () => {
    it('should return projects for the user', async () => {
      // Create a project first
      await request(app)
        .post('/api/v1/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Project 1' });

      const res = await request(app)
        .get('/api/v1/projects')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0].role).toEqual('admin');
      expect(res.body.data[0].project.name).toEqual('Project 1');
    });
  });

  describe('PUT /api/v1/projects/:projectId', () => {
    it('should update a project if admin', async () => {
      const createRes = await request(app)
        .post('/api/v1/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Old Name' });
        
      const projectId = createRes.body.data._id;

      const updateRes = await request(app)
        .put(`/api/v1/projects/${projectId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'New Name' });

      expect(updateRes.statusCode).toEqual(200);
      expect(updateRes.body.data.name).toEqual('New Name');
    });
  });
});
