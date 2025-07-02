const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: {
    cuisines: [String],
    diets: [String],
    recipeTypes: [String],
    allergies: [String],
    allergyOther: String,
  }
});

module.exports = mongoose.model('User', UserSchema); 