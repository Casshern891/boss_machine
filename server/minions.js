const express = require('express');
const app = require('../server');
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
router.get('/:minionId/work', (req, res) => {
    const result = getAllFromDatabase('work').filter(
        work => work.minionId === req.params.minionId
    );
    res.status(200).send(result);
});



module.exports = router; 