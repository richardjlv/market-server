import { Router } from 'express';

import CategoryController from './controllers/CategoryController';
import ProductController from './controllers/ProductController';

const router = Router();

// Products routes
router.get('/products', ProductController.index);
router.get('/products/:id', ProductController.show);
router.post('/products', ProductController.store);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.delete);

// Categories routes
router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);
router.delete('/categories/:id', CategoryController.delete);

export { router };
