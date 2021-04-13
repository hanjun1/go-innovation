module.exports = {
  index,
};

//Google AutoML
const { PredictionServiceClient } = require('@google-cloud/automl').v1;
const client = new PredictionServiceClient();
const projectId = '819100513794';
const location = 'us-central1';
const modelId = 'TCN5642511154816221184';
const content = 'take dog for walk'

async function index(req, res) {
  // let category = await predictCategory()
  // console.log(category)
  res.render("newReminder");
}


async function predictCategory() {
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
  return category
}


