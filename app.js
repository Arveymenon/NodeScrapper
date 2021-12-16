require('dotenv').config();
var express = require('express');
const bodyParser = require('body-parser');

const axios = require("axios");


const routing = require('./routes/route');
const fqdn = require('./services/fqdn');
const env = require('./env');
const dbconfig = require('./services/dbconfig');

var app = express();

app.use(bodyParser.json())

dbconfig()
routing(app)


const port = (process.env.PORT || 9000)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!` );
})

// require('./scraper')()

// To keep the project alive on heroku we need to keep the server running and 
// not crash by sitting idle.
fqdn.then(path => {
  console.log(path.includes("heroku"));
  if(path.includes("heroku")){
    // open heroku page
    setInterval(()=>{
      axios.get(env.heroku.path)
    },60000)
  }
},(err)=>{console.error(err)})