//Google AutoML
const { PredictionServiceClient } = require('@google-cloud/automl').v1;
const client = new PredictionServiceClient();
const projectId = '819100513794';
const location = 'us-central1';
const modelId = 'TCN5642511154816221184';

//wit
const {Wit, log} = require('node-wit');
const MY_TOKEN = process.env.MY_TOKEN
const client1 = new Wit({accessToken: MY_TOKEN});


async function getMatch(str) {
    try{
    const content = str
  
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
    // Wit Datetime extraction API Call
    let witRes = await client1.message(content, {})
    
    let category = "", dateTime = "", grain = ""
    
    if (response.payload[0].displayName)
      category = response.payload[0].displayName;
      
    if (witRes.entities['wit$datetime:datetime'][0].value)
      dateTime = witRes.entities['wit$datetime:datetime'][0].value
    
    if(witRes.entities['wit$datetime:datetime'][0].grain)
      grain = witRes.entities['wit$datetime:datetime'][0].grain 
    
    return {"category": category, "datetime": dateTime, "input": str, "grain": grain};
    }catch(err){
      console.log(err);
    }
  }
  
  module.exports = {getMatch};