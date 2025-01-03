import express from 'express';
import { createOrder, updateOrder, deleteOrder, getOrders, getOrderById, getAllOrders } from '../controllers/order.controller.js';
import auth from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = express.Router();

router.get('/', auth, getOrders);
router.get('/all', auth, requireRole('staff'), getAllOrders); // Route to fetch all orders for staff
router.get('/:id', auth, getOrderById); // Route to fetch a single order by ID
router.post('/', auth, createOrder);
router.put('/:id', auth, requireRole('staff'), updateOrder); // Allow staff to update order status
router.delete('/:id', auth, deleteOrder); // Route to delete an order by ID

export default router;