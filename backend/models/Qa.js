const mongoose = require('mongoose');

let Qa = new mongoose.Schema({
    username: {
      type: String,
    },
    q1: {
      type: String,
    },
    q2: {
        type: String,
    },
    q3: {
        type: String,
    },
    q4: {
        type: String,
    },
    q5: {
        type: String,
    },
    q6: {
        type: String,
    },
    q7: {
        type: String,
    },
    q8: {
        type: String,
    },
    q9: {
        type: String,

    },
    q10: {
        type: String,
    },
  });
  
  Qa.pre('save', async function (next) {
    // let user = this;
    // const hash = await bcrypt.hash(user.password, 10);
    // user.password = hash;
     next();
   });
    
module.exports = mongoose.model('Qa', Qa);