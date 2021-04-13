const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Reminder = require("../models/Reminder");

router.get("/", (req, res) => {
    Reminder.findAll()
        .then(reminders => {
            console.log(reminders);
            res.sendStatus(200);
        })
        .catch(err => console.log(err))
})

module.exports = router;
