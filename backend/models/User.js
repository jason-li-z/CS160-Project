const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'CS160_JWT_SECRET_KEY';

let UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
  },
  lastName: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
  },
  username: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    index: { unique: true },
  },
  password: {
    type: String,
    required: [true, "can't be blank'"],
  },
});

// Individual User Methods
// Save - Adds new entry to database, this is what to do before default 'save' happens
UserSchema.pre('save', async function (next) {
  let user = this;
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

UserSchema.methods.generateJWT = function () {
  let today = new Date();
  let expiration = new Date(today);
  expiration.setHours(today.getHours() + 1); // Expires in 24 hour (1 day)
  console.log(`JWT Expiration Date: ${expiration}`);
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      exp: parseInt(expiration.getTime() / 1000),
    },
    secret
  );
};

module.exports = mongoose.model('User', UserSchema);
