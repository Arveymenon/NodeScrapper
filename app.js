var createError = require('http-errors');
var express = require('express');
const axios = require("axios");


const fqdn = require('./services/fqdn');
const env = require('./env');

var app = express();
require('./scraper')()

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// c053b682-b617-4722-b25a-953b6d5fcd5e
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = (process.env.PORT || 9000)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!` );
})

fqdn.then(path => { 
  console.log(path.includes("heroku"));
  if(path.includes("heroku")){
    // open heroku page
    setInterval(()=>{
      axios.get(env.heroku.path)
    },60000)
  }
})