import { Router } from 'express';
import { register, login, logout, checkLoginStatus, updateUserData, getUserData } from '../controllers/authenticationController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/login-status', checkLoginStatus);
router.get('/get-user-data', getUserData);
router.post('/update-user-data', updateUserData);
router.post('/logout', logout);

export default router;