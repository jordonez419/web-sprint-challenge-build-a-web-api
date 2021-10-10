// Write your "projects" router here!

const express = require('express')
const router = express.Router();

const Project = require('./projects-model')
const { verifyId, verifyProject, verifyProjectPut } = require('./projects-middleware')

router.get('/projects', (req, res) => {
    Project.get()
        .then(projects => {
            if (!projects) {
                res.status(422).json([])
            }
            else {
                res.status(500).json(projects)
            }
        })
        .catch(err => {
            console.log(err)
        })

})

router.get('/projects/:id', verifyId, (req, res) => {
    const { id } = req.project
    Project.get(id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(404).json(err)
        })
})

router.post('/projects', verifyProject, (req, res) => {
    const newProject = req.body;
    Project.insert(newProject)
        .then(project => {
            res.status(201).json(newProject)
        })
        .catch(err => {
            res.status(400).json('Error Creating New Project')
        })

})

router.put("/projects/:id", verifyId, verifyProjectPut, (req, res) => {
    const { id } = req.project;
    const changes = req.body;
    Project.update(id, changes)
        .then(updatedProject => {
            res.status(200).json(changes)
        })
        .catch(err => {
            res.status(400).json('Error Updating database')
        })

})

router.delete("/projects/:id", verifyId, (req, res) => {
    const { id } = req.params;
    Project.remove(id)
        .then(response => {
            res.status(200).json('Succesfuly deleted!')
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

router.get("/projects/:id/actions", verifyId, (req, res) => {
    const { id } = req.params;
    Project.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

module.exports = router;
