const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser=require('body-parser')
const cors = require('cors')
const configuration = new Configuration({
    organization: "org-6ExwDXEmCPEHWbYUuV2xfBz5",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// cors-> help to send messages to and from different ports


// create an xpress api that calls the function above
const app=express()
app.use(bodyParser.json())
app.use(cors())

const port=3080

app.post('/',async(req,res)=> {
  const { message ,currentModel}= req.body;
  console.log(message,"message")
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 3000,
        temperature: 0.5,
      });
      //console.log()
      res.json({
        message : response.data.choices[0].text,
      })
});


app.listen(port,()=>{
    console.log(`Example app listening at http:// localhost :${port}`)
});