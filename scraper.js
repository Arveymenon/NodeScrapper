const cheerio = require("cheerio");
const axios = require("axios");
const env = require('./env');

const OneSignal = require('onesignal-node');
const client = new OneSignal.Client('11482de5-db43-43bd-aed4-9ebf163c569d', 'ZWI0NTAzNWUtNzg5ZS00ODU5LTg2NTAtNTMxYjZlYmYxMzBm');
const userClient = new OneSignal.UserClient('6fab8e1c-3c2c-46fc-8596-1c52d96202b5');

let siteName = "";
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

    let available = new Set();
    const $ = await fetchData(env.Links.amazon[env.mode]);

    if(typeof $ === 'function'){
        let siteName = await $('#nav-logo-sprites').text();
        
        $('#buy-now-button').each((index, element) => {
          available.add(1);
        });

        if(available.size > 0){
          console.log($('#buy-now-button').html())
          notifyResponse('Found PS On Amazon' + available.size)
        }
      }
    crawlOnAmazon()
  } catch(err) {
    console.log("Amazon Scrapping throwing error")
    setTimeout(()=>{
      crawlOnAmazon()
    },5000)
  }
}

const crawlOnFlipkart = async () => {
  console.log('crawling on flipkart', new Date().toISOString())
  try {

    let available = new Set();
    const $ = await fetchData(env.Links.flipkart[env.mode]);
    
    if(typeof $ === 'function'){
      let siteName = await $('#comp-text').text();

      $('.dTTu2M').each((index, element) => {
        available.add(1);
      });
      
      if(available.size > 0){
        console.log($('.dTTu2M').html())
        notifyResponse('Found On Flipkart'+ available.size)
      }
    }
    setTimeout(()=>{
      crawlOnFlipkart()
    },5000)
  }
  catch(err){
    // console.log(err)
    setTimeout(()=>{
      crawlOnFlipkart()
    },5000)
  }
}

const crawlOnGamesTheShop = async () => {
  console.log("crawling on games the shop at",new Date().toISOString())
  try {
    
    let available = new Set();
    const $ = await fetchData(env.Links.GamesTheShop[env.mode]);
    
    if(typeof $ === 'function'){
      let siteName = await $('#ctl00_lblcopy').text();
      $('.addToCart-nw').each((index, element) => {
        available.add(1);
      });
      
      if(available.size > 0){
        console.log($('.addToCart-nw').html())
        notifyResponse('Found On Games The Shop' + available.size)
      }
    }
    setTimeout(()=>{
      crawlOnGamesTheShop()
    },5000)
  }
  catch(err){
    // console.log(err)
    setTimeout(()=>{
      crawlOnGamesTheShop()
    },5000)
  }
}

const crawlOnShopAtSC = async () => {
  console.log("crawling on Shop At SC",new Date().toISOString())
  try {
    
    let available = new Set();
    const $ = await fetchData(env.Links.ShopAtSC[env.mode]);
    
    if(typeof $ === 'function'){
      let siteName = await $('#ctl00_lblcopy').text();
      $('#product-add-to-cart').each((index, element) => {
        available.add(1);
      });
      
      if(available.size > 0){
        console.log($('#product-add-to-cart').html())
        notifyResponse('Found On Shop At SC'+ available.size)
      }
    }
    setTimeout(()=>{
      crawlOnShopAtSC()
    },5000)
  }
  catch(err){
    // console.log(err)
    setTimeout(()=>{
      crawlOnShopAtSC()
    },5000)
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
      },5000)
    }
  }
  catch(err){
    setTimeout(()=>{
      crawlOnCroma()
    },5000)
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
      await // console.log(available, available.size)
    
      notifyResponse('Found On Reliance Digital')
    } else {
      setTimeout(()=>{
        crawlOnRelianceDigital()
      },5000)
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
      await // console.log(available, available.size)
    
      notifyResponse('Found On Vijay Sales')
      crawlOnVijaySales()
    } else {
      setTimeout(()=>{
        crawlOnVijaySales()
      },5000)
    }
  }
  catch(err){
    // console.log(err)
    setTimeout(()=>{
      crawlOnVijaySales()
    },5000)
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