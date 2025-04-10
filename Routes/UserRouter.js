import express from 'express';
import loginController from '../controllers/UserController.js';

const router = express.Router();

router.post('/login', loginController);

export default router;
