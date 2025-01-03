import express from 'express';
import { createOrder, updateOrder, deleteOrder, getOrders, getOrderById } from '../controllers/order.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getOrders);
router.get('/:id', auth, getOrderById); // Route to fetch a single order by ID
router.post('/', auth, createOrder);
router.put('/:id', auth, updateOrder);
router.delete('/:id', auth, deleteOrder); // Route to delete an order by ID

export default router;