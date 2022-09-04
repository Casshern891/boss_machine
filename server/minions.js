const express = require('express');
const app = require('../server');
const router = express.Router();

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db.js');

router.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send("Minion with this Id was not found!");
    }
});



router.get('/', (req, res,) => {
    const allMinions = getAllFromDatabase('minions');
    res.status(200).send(allMinions);
});

router.post('/', (req, res) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});

router.get('/:minionId', (req, res) => {
    res.send(req.minion);
});

router.put('/:minionId', (req, res) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});

router.delete('/:minionId', (req, res) => {
    const minion = deleteFromDatabasebyId('minions', req.params.minionId);
    res.status(204).send(minion);
});

//router for work
router.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
        if (work) {
            req.work = work;
            next();
        } else {
            res.status(404).send('No work found with that Id!');
        }
});

router.get('/:minionId/work', (req, res) => {
    const result = getAllFromDatabase('work').filter(
        work => work.minionId === req.params.minionId
    );
    res.status(200).send(result);
});

router.post('/:minionId/work', (req, res) => {
    const newWork = addToDatabase('work', req.body);
    res.status(201).send(newWork);
});

router.put('/:minionId/work/:workId', (req, res) => {
    if (req.params.minionId !== req.body.minionId) {
        return res.status(400).send('Minion Id must match a minion in our database!');
    }
    const updatedWork = updateInstanceInDatabase('work', req.body);
    res.send(updatedWork);
});

router.delete('/:minionsId/work/:workId', (req, res) => {
    if (req.params.minionId !== req.body.minionId) {
        return res.status(400).send('Minion Id must match a minion in our database!');
    }
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    res.status(204).send(deleted);
});

module.exports = router; 