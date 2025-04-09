const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// App routes

router.get('/', blogController.homepage);
router.get('/categories', blogController.exploreCategories);
router.get('/categories/:id', blogController.exploreCategoriesById);
router.get('/sofa/:id', blogController.exploreSofaById);
router.post('/search', blogController.searchRecipe);
router.get('/explore-latest', blogController.exploreLatest);
router.get('/explore-random', blogController.exploreRandom);
router.get('/submit-sofa', blogController.submitSofa);
//router.post('/submit-sofa', blogController.submitSofaOnPost);

module.exports = router;
