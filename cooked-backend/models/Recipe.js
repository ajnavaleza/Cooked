const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Intermediate', 'Advanced'],
    required: true
  },
  savedDate: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipeId: {
    type: String,
    required: true
  },
  sourceType: {
    type: String,
    enum: ['spoonacular', 'custom'],
    required: true
  }
});

module.exports = mongoose.model('Recipe', recipeSchema); 