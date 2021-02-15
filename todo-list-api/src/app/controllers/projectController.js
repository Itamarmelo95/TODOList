const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware')

const Project = require('../models/Project');
const Task = require('../models/Task');

const router = express.Router();

router.use(authMiddleware);


router.get('/', async (req, res) =>{
    try {
        const projects = await Project.find().populate('tasks');
        console.log(projects);
        return res.send({ projects });

    } catch (error) {
        return res.status(400).send({ error: 'Error get projects' });
    }
})

router.get('/:projectId', async (req, res) =>{

    try {
        const project = await Project.findById(req.params.projectId).populate('tasks');

        return res.send({ project });

    } catch (error) {
        return res.status(400).send({ error: 'Error get project' });
    }

})

router.post('/', async (req, res) =>{
    try {
        
        const { name, tasks, user } = req.body;

        const project = await Project.create({ name, user: user });

        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project._id });

            await projectTask.save();

            project.tasks.push(projectTask);
        }));

        await project.save();

        return res.send({ project });

    } catch (error) {
        return res.status(400).send({ error: 'Error creating new project' });
    }
})

router.put('/:projectId', async (req, res) =>{
    try {
        
        const { name, tasks } = req.body;

        const project = await Project.findByIdAndUpdate(req.params.projectId, {
             name
            }, { new: true });

        project.tasks = [];

        await Task.remove({ project: project._id });

        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project._id });

            await projectTask.save();

            project.tasks.push(projectTask);
        }));

        await project.save();

        return res.send({ project });

    } catch (error) {
        return res.status(400).send({ error: 'Error update project' });
    }
})

router.delete('/:projectId', async (req, res) =>{
    try {
        await Project.findByIdAndRemove(req.params.projectId);

        await Task.remove({ project: req.params.projectId });

        return res.send();

    } catch (error) {
        return res.status(400).send({ error: 'Error delete project' });
    }
})

module.exports = app => app.use('/projects', router);
