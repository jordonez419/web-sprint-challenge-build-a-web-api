// add middlewares here related to actions
// add middlewares here related to projects
const Action = require('./actions-model')
const Project = require('./actions-model')

function verifyId(req, res, next) {
    console.log('verifying id')
    const { id } = req.params;
    Action.get(id)
        .then(action => {
            if (action) {
                req.action = action
                next()
            }
            else {
                res.status(404).json({ message: `Action with ID: ${id} not found` })
            }
        })
        .catch(err => {
            res.status(404).json('error retrieving from database')
        })

}

function verifyAction(req, res, next) {
    console.log('verifying project')
    if (!req.body.notes || !req.body.description || !req.body.project_id) {
        res.status(400).json('Please fill out all fields')
    }
    else {
        next()
    }

}

// function verifyProjectID(req, res, next) {
//     const { id } = req.params;
//     Project.get(id)
//         .then(project => {
//             if (project) {
//                 req.project = project
//             }
//             else {
//                 res.status(404).json({ message: `Project with ID: ${id} not found` })
//             }
//         })
//         .catch(err => {
//             res.status(404).json('erro retrieving from database')
//         })

module.exports = {
    verifyId,
    verifyAction
}