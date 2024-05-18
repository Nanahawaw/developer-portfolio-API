import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";
import Project from "../models/projectModel.js";
import jwt from 'jsonwebtoken'



export const likeProject = async (req, res) => {
    const { projectId } = req.body;


    try {
        const token = req.headers.authorization?.split('')[1]
        if (!token) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodedToken.id
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (project.likes.includes(userId)) {
            return res.status(400).json({ message: 'Project already liked' });
        }

        project.likes.push(userId);
        await project.save();

        res.status(200).json({ message: 'Project liked successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getComments = async (req, res) => {
    const { projectId } = req.params;

    try {
        const project = await Project.findById(projectId).populate('comments');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(project.comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createComment = async (req, res) => {
    const { projectId, text } = req.body;
    const userId = req.user._id; // Assuming you have set up authentication middleware

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newComment = new Comment({ text, user: userId, project: projectId });
        const savedComment = await newComment.save();

        project.comments.push(savedComment._id);
        await project.save();

        res.status(201).json(savedComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}
export const incrementViewCount = async (req, res) => {
    const { projectId } = req.body;

    try {
        // Verify the JWT token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.views += 1;
        await project.save();
        res.status(200).json({ message: 'View count incremented successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};