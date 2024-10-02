import express from 'express';
import { loginAdmin, logoutAdmin, registerAdmin } from '../controllers/admin.controllers.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin);
adminRouter.get('/logout', authenticateToken, logoutAdmin);
adminRouter.post('/register', authenticateToken, registerAdmin);
// adminRouter.delete('/delete', authenticateToken, deleteAdmin);

export default adminRouter;