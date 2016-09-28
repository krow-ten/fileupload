var express = require('express');
var fileUpload = require('express-fileupload')
var request = require('request');

var app = express()
app.use(fileUpload())

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post('/save', (req, res) => {
  var endpoint = 'https://slack.com/api/files.upload'
  var token = process.env.SLACK_API_TOKEN
  var channels = '%23mytest'
  
  var slack = request.post(`${endpoint}?token=${token}&channels=${channels}`, (err, response, body) => {
    res.send(body)
  });
  
  var file = req.files.file
  var form = slack.form();
  form.append('file', file.data, {
    filename: file.name,
    contentType: file.mimetype
  });

});


var port = Number(process.env.PORT || 5000);
app.listen(port, function () {
  console.log("Listening on " + port);
});
