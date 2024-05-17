import express from 'express';
import { getProjects, createProject, deleteProject, updateProject, incrementView } from '../controllers/projectCtrl.js';


const router = express.Router();

router.get('/projects', getProjects)
router.post('/create-project', createProject)
router.delete('/delete-project/:id', deleteProject)
router.put('/update-project/:id', updateProject)
router.post('/increment-view/:projectId', incrementView)

export default router;