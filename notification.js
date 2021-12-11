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
        // console.log("Response:");
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
      app_id: "11482de5-db43-43bd-aed4-9ebf163c569d",
      contents: {"en": message},
      include_player_ids: ["6fab8e1c-3c2c-46fc-8596-1c52d96202b5"]
    };
    sendNotification(notification)
  }

    module.exports = createNotification