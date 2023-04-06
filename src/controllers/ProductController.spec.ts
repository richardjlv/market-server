import request from 'supertest';

import { app } from '../app';

describe('Product Controller', () => {
  it('should be able to create a new product', async () => {
    const product = {
      title: 'Product',
      description: 'Description Product Test',
      price: 100,
      category: 'Leite e derivados',
      images: ['image1', 'image2'],
      unitsInStock: 10,
    };

    const response = await request(app).post('/products').send(product);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title');
    expect(response.body.title).toEqual(product.title);
    expect(response.body).toHaveProperty('description');
    expect(response.body.description).toEqual(product.description);
    expect(response.body).toHaveProperty('price');
    expect(response.body.price).toEqual(product.price);
    expect(response.body).toHaveProperty('category');
    expect(response.body.category.name).toEqual(product.category);
  });

  it('not should be able to create a new product with name exists', async () => {
    const product = {
      title: 'Product',
      description: 'Description Product Test',
      price: 100,
      category: 'Leite e derivados',
      images: ['image1', 'image2'],
      unitsInStock: 10,
    };

    const response = await request(app).post('/products').send(product);

    expect(response.status).toBe(400);
  });

  it('should be able to list all products', async () => {
    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
    expect(response.body.products.length).toBeGreaterThan(0);
  });

  it('should be able to list all products by category', async () => {
    const response = await request(app).get(
      '/products?category=Leite e derivados'
    );

    expect(response.status).toBe(200);
    expect(response.body.products.length).toBeGreaterThanOrEqual(0);
  });

  it('should be able to list all products by search', async () => {
    const response = await request(app).get('/products?search=Product');

    expect(response.status).toBe(200);
    expect(response.body.products.length).toBeGreaterThanOrEqual(0);
  });

  it('should be able to list all products by search and category', async () => {
    const response = await request(app).get(
      '/products?search=Product&category=Leite e derivados'
    );

    expect(response.status).toBe(200);
    expect(response.body.products.length).toBeGreaterThanOrEqual(0);
  });

  it('should be able to show a product', async () => {
    const product = {
      title: 'Product Test 2',
      description: 'Description Product Test',
      price: 100,
      category: 'Leite e derivados',
      images: ['image1', 'image2'],
      unitsInStock: 10,
    };

    const response = await request(app).post('/products').send(product);

    const responseShow = await request(app).get(
      `/products/${response.body.id}`
    );

    expect(responseShow.status).toBe(200);
    expect(responseShow.body).toHaveProperty('id');
    expect(responseShow.body).toHaveProperty('title');
    expect(responseShow.body.title).toEqual(product.title);
    expect(responseShow.body).toHaveProperty('description');
    expect(responseShow.body.description).toEqual(product.description);
    expect(responseShow.body).toHaveProperty('price');
    expect(responseShow.body.price).toEqual(product.price);
    expect(responseShow.body).toHaveProperty('category');
    expect(responseShow.body.category.name).toEqual(product.category);
  });

  it('should not be able to show a product with invalid id', async () => {
    const response = await request(app).get('/products/invalid-id');

    expect(response.status).toBe(400);
  });

  it('should be able to delete a product', async () => {
    const product = {
      title: 'Product Test 3',
      description: 'Description Product Test',
      price: 100,
      category: 'Leite e derivados',
      images: ['image1', 'image2'],
      unitsInStock: 10,
    };

    const response = await request(app).post('/products').send(product);

    const responseDelete = await request(app).delete(
      `/products/${response.body.id}`
    );

    expect(responseDelete.status).toBe(200);
  });

  it('should not be able to delete a product with invalid id', async () => {
    const response = await request(app).delete('/products/invalid-id');

    expect(response.status).toBe(400);
  });

  it('should not be able to delete a product does not exists', async () => {
    const response = await request(app).delete(
      '/products/aaaaaaaaaaaaaaaaaaaaaaaa'
    );

    expect(response.status).toBe(404);
  });

  it('should not be able create a new product without title', async () => {
    const product = {
      title: '',
      description: 'Description Product Test',
      price: 100,
      category: 'Leite e derivados',
      images: ['image1', 'image2'],
      unitsInStock: 10,
    };

    const response = await request(app).post('/products').send(product);

    expect(response.status).toBe(400);
  });

  it('should be able to update a product', async () => {
    const product = {
      title: 'Product Test 3',
      description: 'Description Product Test',
      price: 100,
      category: 'Leite e derivados',
      images: ['image1', 'image2'],
      unitsInStock: 10,
    };

    const response = await request(app).post('/products').send(product);

    const productUpdate = {
      title: 'Product Test 5',
      description: 'Description Product Test',
      price: 100,
      category: 'Leite e derivados',
      images: ['image1', 'image2'],
      unitsInStock: 10,
    };

    const responseUpdate = await request(app)
      .put(`/products/${response.body.id}`)
      .send(productUpdate);

    expect(responseUpdate.status).toBe(200);
    expect(responseUpdate.body.title).toEqual(productUpdate.title);
  });

  it('should not be able to update a product with invalid id', async () => {
    const productUpdate = {
      title: 'Product Test 5',
      description: 'Description Product Test',
      price: 100,
      category: 'Leite e derivados',
      images: ['image1', 'image2'],
      unitsInStock: 10,
    };

    const responseUpdate = await request(app)
      .put('/products/invalid-id')
      .send(productUpdate);

    expect(responseUpdate.status).toBe(400);
  });

  it('should not be able to update a product does not exists', async () => {
    const productUpdate = {
      title: 'Product Test 5',
      description: 'Description Product Test',
      price: 100,
      category: 'Leite e derivados',
      images: ['image1', 'image2'],
      unitsInStock: 10,
    };

    const responseUpdate = await request(app)
      .put('/products/aaaaaaaaaaaaaaaaaaaaaaaa')
      .send(productUpdate);

    expect(responseUpdate.status).toBe(404);
  });

  it('should not be able to update a product without valid fields', async () => {
    const product = {
      title: 'Product Test 3',
      description: 'Description Product Test',
      price: 100,
      category: 'Leite e derivados',
      images: ['image1', 'image2'],
      unitsInStock: 10,
    };

    const response = await request(app).post('/products').send(product);

    const productUpdate = {
      title: '',
      description: 'Description Product Test',
      price: 100,
      category: 'Leite e derivados',
      images: 'image1',
      unitsInStock: 10,
    };

    const responseUpdate = await request(app)
      .put(`/products/${response.body.id}`)
      .send(productUpdate);

    expect(responseUpdate.status).toBe(400);
  });

  it('should be able to update existing uncategorized product', async () => {
    const product = {
      title: 'Product Test update category',
      description: 'Description Product Test',
      price: 100,
      category: 'Leite e derivados',
      images: ['image1', 'image2'],
      unitsInStock: 10,
    };

    const response = await request(app).post('/products').send(product);

    const productUpdate = {
      title: 'Product Test update category 2',
      description: 'Description Product Test 2',
      price: 1002,
      category: 'Product Test update category',
      images: ['image1', 'image2'],
      unitsInStock: 102,
    };

    const responseUpdate = await request(app)
      .put(`/products/${response.body.id}`)
      .send(productUpdate);

    expect(responseUpdate.status).toBe(200);
    expect(responseUpdate.body.title).toEqual(productUpdate.title);
    expect(responseUpdate.body.category.name).toEqual(productUpdate.category);
  });
});
