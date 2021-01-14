const cheerio = require("cheerio");
const axios = require("axios");

const OneSignal = require('onesignal-node');
const client = new OneSignal.Client('11482de5-db43-43bd-aed4-9ebf163c569d', 'ZWI0NTAzNWUtNzg5ZS00ODU5LTg2NTAtNTMxYjZlYmYxMzBm');
const userClient = new OneSignal.UserClient('6fab8e1c-3c2c-46fc-8596-1c52d96202b5');

let siteName = "";
const available = new Set();
var counter = 1

const fetchData = async (url) => {
  try{
    const result = await axios.get(url);
    return cheerio.load(result.data);
  }
  catch(e){
    console.log("scraping failed for: "+url)
    return false
  }
};

const getResults = async () => {
  counter += 1
  try{
    // Need to find the page
    crawlOnAmazon()

    // Couldn't set up
    // crawlOnCroma()
    // crawlOnRelianceDigital()

    crawlOnGamesTheShop()
    crawlOnVijaySales()
    }
  catch(e){
    console.log(e)
    getResults()
  }
  finally{
    console.log(counter)
    console.log('next request')
  }
};

const crawlOnAmazon = async () => {
  try {
    const $ = await fetchData("https://www.amazon.in/dp/B08FV5GC28");
  
    
    if(typeof $ === 'function'){
      let siteName = await $('#nav-logo-sprites').text();

      $('#buy-now-button').each((index, element) => {
        available.add($(element).text());
      });
      console.log(siteName)
      await console.log(available, available.size)
    
      sendResponse('Found On Amazon')
    } else{
      setTimeout(()=>{
        crawlOnAmazon()
      },3000)
    }
  }
  catch(err){
    console.log(err)
    setTimeout(()=>{
      crawlOnAmazon()
    },3000)
  }
}

const crawlOnCroma = async () => {
  try {
    const siteUrl2 = "https://www.croma.com/sony-playstation-5-825gb-ssd-cfi-1008a01r-white-/p/231643";
    const $ = await fetchData(siteUrl2);
  
    
    if(typeof $ === 'function'){
      let siteName = await $('.copywrite').text();
      $('.threehr-pincode').each((index, element) => {
        console.log($(element).text())
        if($(element).text())

        available.add($(element).text());
      });
      
      // $('.out-of-stock-msg-pdp').each((index, element) => {
      //   console.log($(element).text())
      //   if($(element).text())

      //   available.add($(element).text());
      // });

      console.log("Site Name: ",siteName)
      await console.log(available, available.size)
    
      sendResponse('Not On Croma')
    } else{
      setTimeout(()=>{
        crawlOnCroma()
      },3000)
    }
  }
  catch(err){
    setTimeout(()=>{
      crawlOnCroma()
    },3000)
  }
}

const crawlOnRelianceDigital = async () => {
  try {
    const $ = await fetchData("https://www.reliancedigital.in/kelvinator-1-5-ton-3-star-k200-series-kas-x18301b-inverter-split-ac/p/581109875https://www.reliancedigital.in/kelvinator-1-5-ton-3-star-k200-series-kas-x18301b-inverter-split-ac/p/581109875");
  
    
    if(typeof $ === 'function'){
      let siteName = await $('.footer__copyright').text();
      $('#add_to_cart_main_btn').each((index, element) => {
        available.add($(element).text());
      });
      console.log(siteName)
      await console.log(available, available.size)
    
      sendResponse('Found On Reliance Digital')
    } else {
      setTimeout(()=>{
        crawlOnRelianceDigital()
      },3000)
    }
  }
  catch(err){
    console.log(err)
    crawlOnRelianceDigital()
  }
}

const crawlOnGamesTheShop = async () => {
  try {
    const $ = await fetchData("https://www.gamestheshop.com/PlayStation-5-Console/5111");
  
    
    if(typeof $ === 'function'){
      let siteName = await $('#ctl00_lblcopy').text();
      $('.addToCart-nw').each((index, element) => {
        available.add($(element).text());
      });
      console.log(siteName)
      await console.log(available, available.size)
    
      sendResponse('Found On Games The Shop')
    } else {
      setTimeout(()=>{
        crawlOnGamesTheShop()
      },3000)
    }
  }
  catch(err){
    console.log(err)
    setTimeout(()=>{
      crawlOnGamesTheShop()
    },3000)
  }
}

const crawlOnVijaySales = async () => {
  try {
    const $ = await fetchData("https://www.vijaysales.com/Sony-PlayStation-5-1TB-Console-White-/15387");
  
    
    if(typeof $ === 'function'){
      let siteName = await $('#comp-text').text();
      $('#ContentPlaceHolder1_dvexchange').each((index, element) => {
        let style = $(element).css()

        if(style.display != 'none'){
          console.log('Available')
          available.add($(element).text());
        }
      });
      console.log(siteName)
      await console.log(available, available.size)
    
      sendResponse('Found On Vijay Sales')
    } else {
      setTimeout(()=>{
        crawlOnVijaySales()
      },3000)
    }
  }
  catch(err){
    console.log(err)
    setTimeout(()=>{
      crawlOnVijaySales()
    },3000)
  }
}

// https://shopatsc.com/collections/playstation-5/products/playstation-5-console
const shopatsc = async () => {
}

const sendResponse = (message) => {
  if(available.size == 0){
    setTimeout(()=>{
      getResults()
    },3000)
  }else{
    let i = 0
    while(i < 10){
      console.log(message, "Fire Push Notification To 6fab8e1c-3c2c-46fc-8596-1c52d96202b5")
      createNotification(message)
      i+=1
    }
    return {
      available: [...available].sort(),
      siteName
    };
  }
}

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
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });
  
  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
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

createNotification("Server Started")

module.exports = getResults;