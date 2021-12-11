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
    // console.log("scraping failed for: "+url)
    return false
  }
};

const getResults = async () => {
  counter += 1
    // Need to find the page
    crawlOnAmazon()
    crawlOnFlipkart()
    crawlOnGamesTheShop()
    crawlOnShopAtSC()

    // Couldn't set up
    // crawlOnCroma()
    // crawlOnRelianceDigital()

    // Update links For
    // crawlOnVijaySales()
    // }

};

const crawlOnAmazon = async () => {
  console.log('crawling on Amazon', new Date().toISOString())
  try {

    // Old Link
    // const $ = await fetchData("https://www.amazon.in/dp/B08FV5GC28");
    // New Link
    // const $ = await fetchData("https://www.amazon.in/Sony-Playstation-Standard-Console-Ultra/dp/B08FC5L3RG");
    
    // Testing Link (Points to the controller)
    const $ = await fetchData("https://www.amazon.in/Sony-CFI-ZCT1W-DualSense-wireless-controller/dp/B08GZ6QNTC/ref=dp_prsubs_2?pd_rd_i=B08GZ6QNTC&psc=1");

    if(typeof $ === 'function'){
        let siteName = await $('#nav-logo-sprites').text();
        
        $('#buy-now-button').each((index, element) => {
          available.add($(element).text());
        });
        if(available.size() > 0){
          notifyResponse('Found PS On Amazon')
        }
      }
    crawlOnAmazon()
  } catch(err) {
    console.log("Amazon Scrapping throwing error")
    setTimeout(()=>{
      crawlOnAmazon()
    },3000)
  }
}

const crawlOnFlipkart = async () => {
  console.log('crawling on flipkart', new Date().toISOString())
  try {
    // Test Link to controller
    // const $ = await fetchData("https://www.flipkart.com/sony-ps5-dualsense-wireless-controller/p/itm236e858323977");
    
    // Actual Link
    const $ = await fetchData("https://www.flipkart.com/sony-playstation-5-cfi-1008a01r-825-gb-astro-s-playroom/p/itma0201bdea62fa");
    
    if(typeof $ === 'function'){
      let siteName = await $('#comp-text').text();

      $('.dTTu2M').each((index, element) => {
        available.add(1);
      });
      
      if(available.size() > 0){
        notifyResponse('Found On Flipkart')
      }
    }
    setTimeout(()=>{
      crawlOnFlipkart()
    },3000)
  }
  catch(err){
    // console.log(err)
    setTimeout(()=>{
      crawlOnFlipkart()
    },3000)
  }
}

const crawlOnGamesTheShop = async () => {
  console.log("crawling on games the shop at",new Date().toISOString())
  try {
    // actual link
    const $ = await fetchData("https://www.gamestheshop.com/PlayStation-5-Console/5111");
    
    // test link
    // const $ = await fetchData("https://www.gamestheshop.com/Dualsense-Wireless-Controller-Midnight-Black/5738");
    
    if(typeof $ === 'function'){
      let siteName = await $('#ctl00_lblcopy').text();
      $('.addToCart-nw').each((index, element) => {
        available.add($(element).text());
      });
      
      if(available.size() > 0){
        notifyResponse('Found On Games The Shop')
      }
    }
    setTimeout(()=>{
      crawlOnGamesTheShop()
    },3000)
  }
  catch(err){
    // console.log(err)
    setTimeout(()=>{
      crawlOnGamesTheShop()
    },3000)
  }
}

const crawlOnShopAtSC = async () => {
  console.log("crawling on Shop At SC",new Date().toISOString())
  try {
    // actual link
    // const $ = await fetchData("https://shopatsc.com/collections/playstation-5/products/playstation-5-console-store");
    
    // test link
    const $ = await fetchData("https://shopatsc.com/products/ps4-1tb-hzd-ce-gtsii-r-c-ps-3m");
    
    if(typeof $ === 'function'){
      let siteName = await $('#ctl00_lblcopy').text();
      $('#product-add-to-cart').each((index, element) => {
        available.add(1);
      });
      
      if(available.size() > 0){
        notifyResponse('Found On Shop At SC')
      }
    }
    setTimeout(()=>{
      crawlOnShopAtSC()
    },3000)
  }
  catch(err){
    // console.log(err)
    setTimeout(()=>{
      crawlOnShopAtSC()
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
        if($(element).text())

        available.add($(element).text());
      });
      
      // $('.out-of-stock-msg-pdp').each((index, element) => {
      // console.log($(element).text())
      //   if($(element).text())

      //   available.add($(element).text());
      // });
    
      notifyResponse('Not On Croma')
      crawlOnCroma()
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
    const $ = await fetchData("https://www.reliancedigital.in/sony-playstation-5-console/p/491936180");
  
    
    if(typeof $ === 'function'){
      let siteName = await $('.footer__copyright').text();
      $('#add_to_cart_main_btn').each((index, element) => {
        available.add($(element).text());
      });
      // console.log(siteName)
      await // console.log(available, available.size())
    
      notifyResponse('Found On Reliance Digital')
    } else {
      setTimeout(()=>{
        crawlOnRelianceDigital()
      },3000)
    }
  }
  catch(err){
    // console.log(err)
    crawlOnRelianceDigital()
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
          // console.log('Available')
          available.add($(element).text());
        }
      });
      // console.log(siteName)
      await // console.log(available, available.size())
    
      notifyResponse('Found On Vijay Sales')
      crawlOnVijaySales()
    } else {
      setTimeout(()=>{
        crawlOnVijaySales()
      },3000)
    }
  }
  catch(err){
    // console.log(err)
    setTimeout(()=>{
      crawlOnVijaySales()
    },3000)
  }
}

notifyResponse = (message) => {
  let i = 0
  while(i < 10){
    // console.log(message, "Fire Push Notification To 6fab8e1c-3c2c-46fc-8596-1c52d96202b5")
    createNotification(message)
    i+=1
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

createNotification("Server Started")

module.exports = getResults;