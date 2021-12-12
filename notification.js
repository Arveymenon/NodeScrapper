require('dotenv').config();
var sendNotification = function(data) {
    var headers = {
      "Content-Type": "application/json; charset=utf-8"
    };
    
    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };
    
    var https = require('https');
    var req = https.request(options, function(res) {
      res.on('data', function(data) {
        console.log("Notification Sent");
        // console.log(JSON.parse(data));
      });
    });
    
    req.on('error', function(e) {
      // console.log("ERROR:");
      // console.log(e);
    });
    
    req.write(JSON.stringify(data));
    req.end();
  };
  
  const createNotification = (message) => {
    const notification = {
      app_id: process.env.ONESIGNAL_APP_ID,
      contents: {"en": message},
      include_player_ids: [process.env.TEMP_USER_ID]
    };
    sendNotification(notification)
  }

    module.exports = createNotification