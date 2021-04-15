const db = require("../models");
const Reminders = db.Reminder;
const Users = db.User
const data = require("../public/data/reminderData")

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
    const reminders = data.reminders
    let response = [];

    for (let i = 0; i < req.params.num; i++) {
        const num = randomIntFromInterval(0, categories.length-1)
        const category = categories[num]
        const times = data.times

        let strings;
        if (category == "Medications") {
            const medications = reminders[category]
            const quantities = data.quantities
            const drugs = data.drugs
            strings = [
                medications[randomIntFromInterval(0, medications.length-1)],
                quantities[randomIntFromInterval(0, quantities.length-1)],
                drugs[randomIntFromInterval(0, drugs.length-1)],
                "at",
                times[randomIntFromInterval(0, times.length-1)],
            ]
        } else if (category =="Bills") {
            const bills = reminders[category]
            strings = [
                bills[randomIntFromInterval(0, bills.length-1)],
            ]
        } else if (category == "Appointments") {
            const appointments = reminders[category]
            const appointment = appointments[randomIntFromInterval(0, appointments.length-1)]
            if (appointment.includes("with")) {
                strings = [
                    appointment,
                    data.names[randomIntFromInterval(0, data.names.length-1)],
                    "at",
                    times[randomIntFromInterval(0, times.length-1)],
                ]
            } else {
                strings = [
                    appointment,
                    "at",
                    times[randomIntFromInterval(0, times.length-1)],
                ]
            }
        } else if (category == "Tasks") {
            const tasks = reminders[category]
            strings = [
                tasks[randomIntFromInterval(0, tasks.length-1)],
                "at",
                times[randomIntFromInterval(0, times.length-1)],
            ]
        }
        
        let title = strings.join(" ")
        // console.log(title)
        let startDate
        let endDate;
        const day = randomIntFromInterval(-1, 30)*24*3600*1000
        if (title.includes("AM")) {
            const temp = title.split(" AM")[0].split(" ")
            const hour = parseInt(temp[temp.length-1])
            startDate = new Date(Date.now() + day).setHours(hour,0,0,0)
            endDate = new Date(Date.now() + day).setHours(hour,30,0,0)
        } else if (title.includes("PM")) {
            const temp = title.split(" PM")[0].split(" ")
            const hour = parseInt(temp[temp.length-1])
            startDate = new Date(Date.now() + day).setHours(hour+12,0,0,0)
            endDate = new Date(Date.now() + day).setHours(hour+12,30,0,0)
        } else {
            startDate = new Date(Date.now() + day).setHours(8,0,0,0)
            endDate = new Date(Date.now() + day).setHours(8,0,0,0)
        }

        if (category == "Bills" || category == "Medications") {
            if (randomIntFromInterval(0,1) == 1) {
                strings.push(data.frequency[randomIntFromInterval(0, data.frequency.length-1)])
            }
        }
        title = strings.join(" ")

        response.push({
            i,
            "category": category,
            "string": title,
        })
        Reminders.create({
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            ThreadId: 1,
            settings: "{}",
            userId: 2,
            authorId: 2,
            title: title,
            description: "generated reminder",
            category: categories[randomIntFromInterval(0, categories.length-1)]
        })
    }
    res.send(response)
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}