const db = require("../models");
const Reminders = db.Reminder;
const Users = db.User

module.exports = {
    isLoggedIn,
    createReminderData,
    getCategoryData,
};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.json({
        message: "Not logged in"
    })
  }

async function getCategoryData(req, res) {
    const category = req.params.category
    const user = await Users.findOne({ where: {'id': req.user.id} })
    const data = await Reminders.findAll()
    res.json({
        category: category,
        data: data
    })
}

function createReminderData(req, res) {
    const categories = ["Medications", "Bills", "Reminders", "Tasks"]
    for (let i = 0; i < req.params.num; i++) {
        Reminders.create({
            settings: "{ settings }",
            userId: req.user.id,
            authorId: req.user.id,
            title: "fake reminder",
            description: "this is a fake reminder",
            category: categories[randomIntFromInterval(0, categories.length-1)]
        })
    }

    res.send(req.params.num + " Fake Reminders Created")
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }