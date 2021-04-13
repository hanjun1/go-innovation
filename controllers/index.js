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


async function index(req, res) {
  // let category = await predictCategory()
  // console.log(category)
  res.render("newReminder");
}


async function fillForm(req, res) {
  console.log(req.body.input)
  const content = req.body.input
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
  return res.send(category)
}


