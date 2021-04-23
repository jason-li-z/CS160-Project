const mongoose = require('mongoose');


let QuestionSchema = new mongoose.Schema({
    userName: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
    },
    questionArray: [{
        q1: Number, 
        q2: Number,
        q3: Boolean,
        q4: Number,
        q5: Number,
        q6: Number,
        q7: Boolean,
        q8: Boolean,
        q9: Boolean,
        q10: String,
        date: Date,
    }],
  });
  
  module.exports = mongoose.model('Questions', QuestionSchema);