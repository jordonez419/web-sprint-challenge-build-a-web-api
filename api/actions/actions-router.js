// Write your "actions" router here!
const express = require('express')
const router = express.Router();

const Action = require('./actions-model')
const { verifyId, verifyAcion, verifyAction } = require('./actions-middlware')

router.get('/actions', (req, res) => {
    Action.get()
        .then(actions => {
            if (!actions) {
                res.status(422).json([])
            }
            else {
                res.status(500).json(actions)
            }
        })
        .catch(err => {
            console.log(err)
        })

})


router.get('/actions/:id', verifyId, (req, res) => {
    const { id } = req.action
    Action.get(id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(404).json(err)
        })
})

router.post('/actions', verifyAction, verifyId, (req, res) => {
    const newAction = req.body;
    Action.insert(newAction)
        .then(action => {
            res.status(201).json(newAction)
        })
        .catch(err => {
            res.status(400).json('Error Creating New Project')
        })
})

router.put("/actions/:id", verifyId, (req, res) => {
    // Still need to verify ID via middleware
    const { id } = req.params;
    const changes = req.body;
    if (!changes.notes || !changes.description) {
        res.status(400).json('Please fill out all fields')
    }
    else {
        Action.update(id, changes)
            .then(updatedAction => {
                res.status(200).json(changes)
            })
            .catch(err => {
                res.status(400).json(`Could not find project with ID : ${id}`)
            })
    }
})

router.delete("/actions/:id", verifyId, (req, res) => {
    const { id } = req.action;
    Action.remove(id)
        .then(response => {
            res.status(200).json('Succesfuly deleted!')
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})






module.exports = router