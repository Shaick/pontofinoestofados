const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const blogController = require('../controllers/blogController');

// App routes

router.get('/', blogController.homepage);
router.get('/categories', blogController.exploreCategories);
/* router.get('/recipe/:id', recipeController.exploreRecipes);
router.get('/categories/:id', recipeController.exploreCategoriesById);
router.post('/search', recipeController.searchRecipe);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random', recipeController.exploreRandom);
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipeOnPost); */

module.exports = router;
