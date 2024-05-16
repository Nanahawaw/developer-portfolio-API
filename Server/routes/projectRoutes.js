import express from 'express';
import { getProjects, createProject, deleteProject, updateProject } from '../controllers/projectCtrl.js';


const router = express.Router();

router.get('/projects', getProjects)
router.post('/create-project', createProject)
router.delete('/delete-project/id', deleteProject)
router.put('/update-project', updateProject)

export default router;