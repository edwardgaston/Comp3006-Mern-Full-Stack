import express from 'express';
import { createMenuItem, updateMenuItem, deleteMenuItem, getMenuItems, getMenuItemById } from '../controllers/menu.item.controller.js';
import auth from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = express.Router();

router.get('/', getMenuItems);
router.get('/:id', getMenuItemById);
router.post('/', auth, requireRole('admin'), createMenuItem);
router.put('/:id', auth, requireRole('admin'), updateMenuItem);
router.delete('/:id', auth, requireRole('admin'), deleteMenuItem);

export default router;