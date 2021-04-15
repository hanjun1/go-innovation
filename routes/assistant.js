var express = require('express');
var router = express.Router();
var getMatch = require('../controllers/speech').getMatch
const { conversation } = require("@assistant/conversation");
var getMatch = require('../controllers/speech').getMatch;
const User = require('../models').User
const Reminder = require('../models').Reminder
/* 
Bills
Appointments
Medications
Tasks
*/
//ghetto sequelize patch for date rendering


const app = conversation({
    clientId: process.env.ACTIONS_CLIENT_ID
  });

  async function getUser(userParams){
    try{
      let thisUser = await User.findOne({where: {'googleId': userParams.sub}})
      if (thisUser) {
        return thisUser
      } else
        return null
        
    } catch(err){
      console.log(err)
    }
    
  
  }
  /* Reminder{
    settings: str(255),
    userId: int(),
    authorId: int(),
    title: str(255),
    description: str(255),
    category: str(255),
    startDate: timestamp with timezone, (2021-04-14 03:14:03.97+00)
    endDate: ""
    threadId: int(),
  } */
  
  Date.prototype.addHours = function(int){
    this.setHours(this.getHours()+int)
    return this;
  }
  
  app.handle("CREATE", async conv =>{
    try{
        let returnJSON = {}
        let parsed = await getMatch(conv.intent.params.reminder.resolved);
        let returnMessage = `Creating a new reminder called: "${parsed.input}" `
        let parsedDate;
        if (parsed.datetime){
          parsedDate = new Date(parsed.datetime)
          console.log(parsedDate.toISOString())
          console.log(parsed.datetime)
          returnMessage += `This will take place on: ${parsedDate.toDateString()}, `
          if (parsed.grain && (parsed.grain=="hour" ||parsed.grain=="minute"||parsed.grain=="second" )){
            let timeStr = parsedDate.toLocaleTimeString('en-US');
            returnMessage += ` at ${timeStr.slice(0,-6)+timeStr.slice(-2)}`;
          }
        }
        let thisUser = await getUser(conv.user.params.tokenPayload)
        console.log("id",thisUser.dataValues.id)

        await Reminder.create({
          settings: JSON.stringify({settings: "fred"}),
          userId: parseInt(thisUser.dataValues.id),
          authorId: parseInt(thisUser.dataValues.id),
          title: parsed.input,
          description: "Add a description",
          category: parsed.category,
          startDate: parsed.datetime,
          endDate: parsedDate.addHours(1).toISOString(),
          // threadId: int(),
        });
        conv.add(returnMessage);
        conv.add("What else can I help you with?")
        
    }catch(err){
        console.log(err);
    }
    
    
})

app.handle("FINAL", async conv =>{
  try{
      conv.add(`Hello ${conv.user.params.tokenPayload.given_name}, welcome to Reminder`)    
      console.log(conv.user)
  }catch(err){
      console.log(err);
  }
  
  
})
app.handle("CHECK_USER", async conv => {
    try{
        let thisUser = await getUser(conv.user.params.tokenPayload)
        if(thisUser){
        conv.user.params.test = "test"
        conv.add(`Hello ${thisUser.firstName}, how can I help you?`)
        /* conv.add(
            new Image({
            url: conv.user.params.tokenPayload.picture,
            alt: "Profile Picture",
            })
        );*/
        }else{
        conv.add('It looks like you dont have an account with us, visit us at Reminder.com to create one today!')
        }
    }catch(err){
        console.log(err);
    }

    
});
router.post('/', app)
module.exports = router;