module.exports = {
  index,
  fillForm,
};

//Google AutoML
const { PredictionServiceClient } = require('@google-cloud/automl').v1;
const client = new PredictionServiceClient();
const projectId = '819100513794';
const location = 'us-central1';
const modelId = 'TCN5642511154816221184';

//wit entity extraction
const {Wit, log} = require('node-wit');
const MY_TOKEN = process.env.MY_TOKEN
const client1 = new Wit({accessToken: MY_TOKEN});

async function index(req, res) {
  res.render("index");
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

