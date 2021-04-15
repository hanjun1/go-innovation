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
    const user = await Users.findOne({ where: {'id': 2} })
    const data = await Reminders.findAll({ where: {
        userId: 2,
    }})
    res.json({
        category: category,
        data: data
    })
}

function createReminderData(req, res) {
    const categories = ["Medications", "Bills", "Reminders", "Tasks"]
    for (let i = 0; i < req.params.num; i++) {
        const date = new Date()
        console.log(date)
        const startDate = date.setDate(date.getDate() + randomIntFromInterval(1,7));
        const endDate = startTime + 3600*2;
        console.log(startTime, endTime)

        const settings = {
            start: new Date(startTime).toISOString().slice(0, 19).replace('T', ' '),
            end: new Date(endTime).toISOString().slice(0, 19).replace('T', ' ')
        }
        
        Reminders.create({
            startDate: new Date(startTime).toISOString().slice(0, 19).replace('T', ' '),
            endDate: new Date(endTime).toISOString().slice(0, 19).replace('T', ' '),
            threadId: 1,
            settings: "{}",
            userId: 2,
            authorId: 2,
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