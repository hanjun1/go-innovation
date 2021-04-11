const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Reminder = require("../models/ReminderModel");

router.get("/", (req, res) => {
    Reminder.findAll()
        .then(reminders => {
            console.log(reminders);
            res.sendStatus(200);
        })
        .catch(err => console.log(err))
})

module.exports = router;
