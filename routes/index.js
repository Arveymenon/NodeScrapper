const express = require("express");
const router = express.Router();
const getResults = require("../scraper");

var req_count = 0
/* GET home page. */
router.get("/", async function(req, res, next) {
  req_count += 1
  try{
    const result = await getResults();
    // res.render("index", result);
    res.status(200).json({"working": true})
  }
  catch(e){
    console.log(e)
  }
  finally{
    console.log(req_count)
    console.log('Response Sent')
  }
});
getResults()

module.exports = router;
