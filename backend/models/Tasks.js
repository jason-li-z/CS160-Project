const mongoose = require('mongoose');

let TaskSchema = new mongoose.Schema({

    user: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
    },
    taskArray: [
      {
        name: String,
        description: String,
        date: String,
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
});


module.exports = mongoose.model('Tasks', TaskSchema);