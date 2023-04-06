import request from 'supertest';

import { app } from '../app';

describe('Category Controller', () => {
  it('should be able to create a new category', async () => {
    const category = { name: 'Category Test 3' };

    const response = await request(app).post('/categories').send(category);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body.name).toEqual(category.name);
  });

  it('not should be able to create a new category with name exists', async () => {
    const category = { name: 'Category Test 3' };

    const response = await request(app).post('/categories').send(category);

    expect(response.status).toBe(400);
  });

  it('should be able to list all categories', async () => {
    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body.categories.length).toBeGreaterThan(0);
  });

  it('should be able to delete a category', async () => {
    const category = { name: 'Category Test delete' };

    const response = await request(app).post('/categories').send(category);

    const responseDelete = await request(app).delete(
      `/categories/${response.body.id}`
    );

    expect(responseDelete.status).toBe(200);
  });

  it('should not be able to delete a category with invalid id', async () => {
    const response = await request(app).delete('/categories/invalid-id');

    expect(response.status).toBe(400);
  });

  it('should not be able to delete a category does not exists', async () => {
    const response = await request(app).delete(
      '/categories/aaaaaaaaaaaaaaaaaaaaaaaa'
    );

    expect(response.status).toBe(404);
  });

  it('should not be able create a new category without name', async () => {
    const category = { name: '' };

    const response = await request(app).post('/categories').send(category);

    expect(response.status).toBe(400);
  });
});
