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

router.get('/', (req, res,) => {
    const allMinions = getAllFromDatabase('minions');
    res.status(200).send(allMinions);
});

router.post('/', (req, res) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});


module.exports = router; 