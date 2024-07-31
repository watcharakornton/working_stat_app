import express from 'express';
import { createPassword, viewPassword, deletePassword } from '../controllers/passwordController.js'

const router = express.Router();

// Route to create new password
router.post('/create', createPassword);

// Route to view exsting password
router.get('/view', viewPassword);

router.delete('/delete', deletePassword);

export default router;
