module.exports = {
  index,
  fillForm,
};

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

async function index(req, res) {
  res.render("index");
}

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

    // Wit entity extraction API Call

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

    return res.send({ category: category, datetime: datetime, action: action });
  }
}
