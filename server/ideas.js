const express = require('express');
const app = require('../server.js');
const router = express.Router();

const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require('./db.js');

router.param('ideaId', (req, res, next, id) => {
    const found = getFromDatabaseById('ideas', id);
    if (found) {
        req.idea = found;
        next();
    } else {
        res.status(404).send('Idea with that ID not found!');
    }
});

router.get('/', (req, res) => {
    const allIdeas = getAllFromDatabase('ideas');
    res.status(200).send(allIdeas);
});

router.post('/', (req, res) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

router.get('/:ideaId', (req, res) => {
    res.send(req.idea);
});

router.put('/:ideaId', (req, res) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

router.delete('/:ideaId', (req, res) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
    res.status(204).send(deleted);
});

module.exports = router; 