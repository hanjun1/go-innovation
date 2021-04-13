const express = require("express");
const router = express.Router();
const db = require("../models");
var Reminder = db.Reminder;

router.get("/", (req, res) => {
    Reminder.findAll()
        .then(reminders => {
            console.log(reminders);
            res.sendStatus(200);
        })
        .catch(err => console.log(err))
})

module.exports = router;
