import { Router } from 'express';

import ProductController from './controllers/ProductController';

const router = Router();

// Products routes
router.get('/products', ProductController.index);
router.get('/products/:id', ProductController.show);
router.post('/products', ProductController.store);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.delete);

export { router };
