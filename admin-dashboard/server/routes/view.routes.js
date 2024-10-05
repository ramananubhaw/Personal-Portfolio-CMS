// to be deleted

import express from 'express';
import { getInfo, getSkills, getProjects, getExperience, getProfiles } from '../controllers/view.controllers.js';

const viewRouter = express.Router();

viewRouter.get('/info', getInfo);
viewRouter.get('/skills', getSkills);
viewRouter.get('/experience', getExperience);
viewRouter.get('/projects', getProjects);
viewRouter.get('/profiles', getProfiles);

export default viewRouter;