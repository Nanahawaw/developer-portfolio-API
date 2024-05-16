import Project from '../models/projectModel.js'

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createProject = async (req, res) => {
    const { title, description, image, url } = req.body;

    const newProject = new Project({ title, description, image, url });

    try {
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteProject = async (req, res) => {
    const id = req.params.id;
    const findProject = await Project.findByIdAndDelete(id);
    if (!findProject
    ) {
        return res.status(404).json({ message: 'Project not found' });
    }
    await findProject.save();
    return res.status(200).json({ message: 'Project deleted successfully' });
}

export const updateProject = async (req, res) => {
    const id = req.params.id;
    const { title, description, image, url } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(id, { title, description, image, url }, { new: true });
    if (!updatedProject
    ) {
        return res.status(404).json({ message: 'Project not found' });
    }
    await updatedProject.save();
    return res.status(200).json({ message: 'Project updated successfully' });
}
