const db = require("../models");
const Reminders = db.Reminder;
const Users = db.User
const Alerts = db.Alert
const data = require("../public/data/reminderData")

module.exports = {
    isLoggedIn,
    createReminderData,
    getCategoryData,
    changeCheckbox,
    fillForm,
    addItem,
    createAlert,
    updateAlertStatus
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
            ReminderChainId: 0,
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


async function changeCheckbox(req, res) {
    const category = req.params.category
    const user = await Users.findOne({ where: {'id': 2} })
    const reminder = await Reminders.findOne({ where: {
        id: req.body.reminderId
    }})
    reminder.checked = req.body.checked
    await reminder.save()
    res.status(200).send("value changed")
}


function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Google AutoML
const { PredictionServiceClient } = require("@google-cloud/automl").v1;
const client = new PredictionServiceClient();
const projectId = "819100513794";
const location = "us-central1";
const modelId = "TCN5642511154816221184";

//wit entity extraction
const { Wit, log } = require("node-wit");
const MY_TOKEN = process.env.MY_TOKEN;
const client1 = new Wit({ accessToken: MY_TOKEN });

async function fillForm(req, res) {
    //initialize returns
    let category = "";
    let action = "";
    let datetime = "";
  
    console.log(req.body.input);
    const content = req.body.input;
  
    //handles empty input
    if (content == null || content.trim() === "") {
      return res.send({});
    } else {
      // Google autoML categorization API Call
      try {
        const request = {
          name: client.modelPath(projectId, location, modelId),
          payload: {
            textSnippet: {
              content: content,
              mimeType: "text/plain",
            },
          },
        };
        const [response] = await client.predict(request);
        category = response.payload[0].displayName;
        console.log("hi");
      } catch {}
  
      console.log(category);
  
      // Wit entity extraction API Call - action/datetime
      const client1 = new Wit({ accessToken: MY_TOKEN });
      let responseObject = await client1.message(content, {});
  
      try {
        datetime = responseObject.entities["wit$datetime:datetime"][0].value;
      } catch {}
      try {
        action = responseObject.entities["task:task"][0].body;
      } catch {}
  
      console.log(action);
      console.log(datetime);
  
      // Detect recurrance
      let recurrance = getRepeat(content);
  
      // response object
      console.log(recurrance)


      return res.send({
        category: category,
        datetime: datetime,
        action: action,
        ...recurrance,
      });
    }
  }
  
  //checks if recurring and recurrence interval
  function getRepeat(content) {
    let dict = [
      {
        interval: "daily",
        keywords: [
          "everyday",
          "every day",
          "each day",
          "daily",
          "every night",
          "every morning",
          "every evening",
        ],
      },
      {
        interval: "weekly",
        keywords: [
          "every week",
          "weekly",
          "each week",
          "every mon",
          "every tues",
          "every wed",
          "every thurs",
          "every fri",
          "every sat",
          "every sun",
          "sundays",
          "mondays",
          "tuesdays",
          "wednesdays",
          "thursdays",
          "fridays",
          "saturdays",
        ],
      },
      {
        interval: "monthly",
        keywords: [
          "every month",
          "monthly",
          "each month",
          "every jan",
          "every feb",
          "every mar",
          "every apr",
          "every may",
          "every jun",
          "every jul",
          "every aug",
          "every sept",
          "every oct",
          "every nov",
          "every dec",
        ],
      },
    ];
  
    let repeat = false;
    let repeatInterval = "";
  
    dict.forEach((element) => {
      if (element.keywords.some((word) => content.toLowerCase().includes(word))) {
        repeat = true;
        repeatInterval = element.interval;
      }
    });
    return { repeat: repeat, repeatInterval: repeatInterval };
  }

function addItem(req,res) {
    console.log(req.body)
    

    // Reminders.create({
    //     startDate: new Date(datetime),
    //     endDate: new Date(datetime),
    //     ReminderChainId: 0,
    //     settings: "{}",
    //     userId: 2,
    //     authorId: 2,
    //     title: title,
    //     description: "generated reminder",
    //     category: categories[randomIntFromInterval(0, categories.length-1)]
    // })
}

async function createAlert(req,res) {
    const reminder = await Reminders.findOne({ where: {'id': req.body.reminderId }})
    let alert = await Alerts.findOne({ where: {'reminderId': req.body.reminderId }})
    if (alert) {
        const nextUpdate = new Date(Date.now() + 15*60*1000)
        if (alert.updatedAt > nextUpdate) {
            alert.updatedAt = new Date()
            alert.save()
            return res.send({
                reminder: req.body.reminderId,
                updated: true,
                msg: "Alert update."
            })
        } else {
            return res.send({
                reminder: req.body.reminderId,
                updated: false,
                msg: "No alert sent, please wait 15 minutes from the last alert."
            })
        }
    }
    // const message = `${req.user.firstName} sent you an alert to remind you of ${reminder.title}`

    Alerts.create({
        reminderId: req.body.reminderId,
        // senderId: req.user.id,
        // userId: reminder.userId
        senderId: 1,
        userId: 2,
        message: "test message alert " + req.body.reminderId,
    })
    return res.send({
        reminder: req.body.reminderId,
        updated: true,
        msg: "Alert created."
    })
}

async function updateAlertStatus(req,res) {
    let alert = await Alerts.findOne({ where: {'id': req.body.id }})
    let reminder = await Reminders.findOne({ where: {'id': alert.reminderId }})
    const value = req.body.value 
    if (value == "true") { 
        reminder.checked = true
        reminder.save()
    } 
    alert.complete = true
    alert.save()
    return res.send({
        msg: `Reminder ${reminder.id}, checked: ${reminder.checked}. Alert ${alert.id}, complete: ${alert.complete}`,
        alert: alert.complete,
        reminder: reminder.checked,
        reminderId: reminder.id
    })
}

