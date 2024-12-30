import express from 'express';
import { getOrders, createOrder, updateOrderStatus, deleteOrder } from '../controllers/order.controller.js';

const router = express.Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.put('/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);

export default router;