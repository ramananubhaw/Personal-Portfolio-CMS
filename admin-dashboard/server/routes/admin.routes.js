import express from 'express';
import { loginAdmin, logoutAdmin, registerAdmin, editInfo, editSkills, editProjects, editExperience } from '../controllers/admin.controllers.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin);
adminRouter.get('/logout', authenticateToken, logoutAdmin);
adminRouter.post('/register', authenticateToken, registerAdmin);
adminRouter.put('/info', authenticateToken, editInfo);
adminRouter.put('/skills', authenticateToken, editSkills);
adminRouter.put('/projects', authenticateToken, editProjects);
adminRouter.put('/experience', authenticateToken, editExperience);
adminRouter.put('/profiles', authenticateToken, editProjects);

export default adminRouter;