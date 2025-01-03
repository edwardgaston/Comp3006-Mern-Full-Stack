import express from 'express';
import { register, login, getUser, updateUser, deleteUser } from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getUser);
router.put('/me', auth, updateUser);
router.delete('/me', auth, deleteUser);

export default router;