import express from 'express';
import { createMenuItem, updateMenuItem, deleteMenuItem, getMenuItems } from '../controllers/menu.item.controller.js';
import auth from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = express.Router();

router.get('/', getMenuItems);
router.post('/', auth, requireRole('admin'), createMenuItem);
router.put('/:id', auth, requireRole('admin'), updateMenuItem);
router.delete('/:id', auth, requireRole('admin'), deleteMenuItem);

export default router;