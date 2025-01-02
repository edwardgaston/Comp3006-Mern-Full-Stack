import express from 'express';
import { createOrder, updateOrder, deleteOrder, getOrders } from '../controllers/order.controller.js';
import auth from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = express.Router();

router.get('/', auth, getOrders);
router.post('/', auth, createOrder);
router.put('/:id', auth, requireRole('staff'), updateOrder);
router.delete('/:id', auth, requireRole('staff'), deleteOrder);

export default router;