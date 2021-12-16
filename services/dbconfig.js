const mongoose = require("mongoose");

async function dbconfig() {
    await mongoose.connect(process.env.MONGO_URI);
  }

dbconfig().catch(console.error);

module.exports = dbconfig;