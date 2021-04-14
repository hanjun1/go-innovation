var express = require('express');
var router = express.Router();

const { conversation, Image } = require("@assistant/conversation");
const {Table} = require('actions-on-google')
const User = require('../models').User

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
  
app.handle("TEST", async conv =>{
    try{
        conv.add(`Hello ${conv.user.params.tokenPayload.given_name}, welcome to Reminder`)    
        console.log(conv.user.params)
    }catch(err){
        console.log(err);
    }
    
    
})
app.handle("CHECK_USER", async conv => {
    let message = "";
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