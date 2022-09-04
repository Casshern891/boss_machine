const express = require('express');
const app = require('../server');
const router = express.Router();

const {
    createMeeting,
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,
} = require('./db.js');

router.get('/', (req, res) => {
    const allMeetings = getAllFromDatabase('meetings');
    res.status(200).send(allMeetings);
});

router.post('/', (req, res) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});

router.delete('/', (req, res) => {
    const deleted = deleteAllFromDatabase('meetings');
    res.status(204).send(deleted);
});

module.exports = router;