import express from 'express';
import { getProjects, createProject, deleteProject } from '../controllers/projectCtrl.js';


const router = express.Router();

router.get('/projects', getProjects)
router.post('/create-project', createProject)
router.delete('/delete-project', deleteProject)

export default router;