// add middlewares here related to projects
const Project = require('./projects-model')

function verifyId(req, res, next) {
    console.log('verifying id')
    const { id } = req.params;
    Project.get(id)
        .then(project => {
            if (project) {
                req.project = project
                next()
            }
            else {
                res.status(404).json({ message: `Project with ID: ${id} not found` })
            }
        })
        .catch(err => {
            res.status(404).json('erro retrieving from database')
        })

}

function verifyProject(req, res, next) {
    console.log('verifying project')
    if (!req.body.name || !req.body.description) {
        res.status(400).json('Please fill out all fields')
    }
    else {
        next()
    }

}
function verifyProjectPut(req, res, next) {
    if (!req.body.name || !req.body.description || req.body.completed === undefined) {
        res.status(400).json('Please fill out all fields')
    }
    else {
        next()
    }

}

module.exports = {
    verifyId,
    verifyProject,
    verifyProjectPut
}