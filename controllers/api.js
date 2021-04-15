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
    const categories = ["Medications", "Bills", "Appointments", "Tasks"]
    const data = []
    for (let i = 0; i < req.params.num; i++) {
        const date = Date.now() + randomIntFromInterval(-24, 24)*3600*1000 + randomIntFromInterval(-1, 30)*24*3600*1000
        const startDate = roundMinutes(new Date(date))
        const endDate = roundMinutes(new Date(date + 60*60*1000))
        // console.log(date, startDate, endDate)
        Reminders.create({
            startDate: startDate,
            endDate: endDate,
            ThreadId: 1,
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

function roundMinutes(date) {
    date.setHours(date.getHours() + Math.round(date.getMinutes()/60));
    date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds
    return date;
}
