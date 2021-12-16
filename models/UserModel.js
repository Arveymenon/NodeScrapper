const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: [true, "Name field is required"] },
  mobile: {
    type: String,
    required: [true, "Mobile field is required"],
    length: [10, "Mobile number must be 10 digits"],
    unique: [true, "Mobile number already exists"]
  },
  email: { 
    type: String, 
    required: [true, "Email field is required"], 
    unique: [true, "Email already exists"] 
  },
  player_id: {
    type: String, 
    required: [true, "Player ID field is required"], 
    unique: [true, "Player ID already exists"] 
  },
});

userSchema.path('email').validate(function(value, done) {
  this.model('User').count({ email: value }, function(err, count) {
      if (err) {
        done(err);
        return false;
      }
      console.log(count)
      if(count > 0) {
        console.log(done);
        return false;
      }
      // If `count` is greater than zero, "invalidate"
      done(!count);
  });
}, 'Email already exists');

module.exports = mongoose.model('User', userSchema);