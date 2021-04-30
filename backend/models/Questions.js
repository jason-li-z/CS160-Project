const mongoose = require('mongoose');

let QuestionSchema = new mongoose.Schema({
  userName: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    unique: true,
  },
  questionArray: [
    {
      q1: String,
      q2: Number,
      q3: Number,
      q4: Boolean,
      q5: Number,
      q6: Number,
      q7: Boolean,
      q8: Boolean,
      q9: Boolean,
      q10: Boolean,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model('Questions', QuestionSchema);
