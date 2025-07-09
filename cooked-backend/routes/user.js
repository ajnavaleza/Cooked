const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');

// Get user's saved recipes
router.get('/recipes', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.user.id }).sort({ savedDate: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Save a recipe
router.post('/recipes', auth, async (req, res) => {
  try {
    const { title, difficulty, recipeId, sourceType } = req.body;
    
    // Check if recipe already saved
    const existingRecipe = await Recipe.findOne({ 
      userId: req.user.id,
      recipeId: recipeId
    });

    if (existingRecipe) {
      return res.status(400).json({ msg: 'Recipe already saved' });
    }

    const recipe = new Recipe({
      title,
      difficulty,
      recipeId,
      sourceType,
      userId: req.user.id
    });

    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete a saved recipe
router.delete('/recipes/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ 
      _id: req.params.id,
      userId: req.user.id
    });

    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }

    await recipe.remove();
    res.json({ msg: 'Recipe removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router; 