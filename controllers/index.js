const db = require("../models");
const Op = require("../models/index").Sequelize.Op
const Reminders = db.Reminder;

module.exports = {
  index,
  fillForm
};

//Google AutoML
const { PredictionServiceClient } = require('@google-cloud/automl').v1;
const client = new PredictionServiceClient();
const projectId = '819100513794';
const location = 'us-central1';
const modelId = 'TCN5642511154816221184';

//wit entity extraction
const {Wit, log} = require('node-wit');
const MY_TOKEN = 'PHADUGLQZAA4A4IW2SY3FZHWGIDCQGSO'

async function index(req, res) {
    const now = new Date()
    // const beginDate = new Date(Date.now() - 3600*12*1000)
    // const endDate = new Date(Date.now() + 3600*12*1000)
    let beginDate, endDate;
    if (now.getHours() < 4) {
        beginDate = new Date(Date.now() - 3600*24*1000).setHours(4,0,0,0)
        endDate = new Date(Date.now()).setHours(23,59,59,999)
    } else if (now.getHours() < 4 ) {
        beginDate = new Date(Date.now()).setHours(4,0,0,0)
        endDate = new Date(Date.now() + 1).setHours(23,59,59,999)

    } else {
        beginDate = new Date(Date.now()).setHours(4,0,0,0)
        endDate = new Date(Date.now() + 1).setHours(23,59,59,999)

    }
    const data = await Reminders.findAll({
        where: {
            userId: 2,
            startDate: {
               [Op.between]: [beginDate, endDate],
            },
          },
          order: [['startDate', 'ASC']],
    })
    let index = data.length;
    for (let i=0; i < data.length; i++ ) {
        const date = data[i].dataValues.startDate 
        if (date > now) {
            index = i
            break;
        }
    }
    res.render("index", {
        data: data,
        index: index,
        
    });
}


async function fillForm(req, res) {
  console.log(req.body.input)
  const content = req.body.input

  // Google autoML categorization API Call
  const request = {
      name: client.modelPath(projectId, location, modelId),
      payload: {
          textSnippet: {
              content: content,
              mimeType: 'text/plain', // Types: 'test/plain', 'text/html'
          },
      },
  };
  const [response] = await client.predict(request);
  let category = response.payload[0].displayName
  console.log(category)

  // Wit Datetime extraction API Call
  const client1 = new Wit({accessToken: MY_TOKEN});
  let datetime = await client1.message(content, {})
  datetime = datetime.entities['wit$datetime:datetime'][0].value

  console.log(datetime)
  
  return res.send({category: category, datetime: datetime})
}


