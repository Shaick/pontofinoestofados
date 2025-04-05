require('../models/database');
const Category = require("../models/Category");
//const mongoose = require('mongoose');
//const { ObjectId } = mongoose.Types;
//mongoose.set('strictQuery', true);


//Get homepage
exports.homepage = async(req, res) => {
    try{
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
       /*  const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
        const thai = await Recipe.find({ 'category': 'Thai' }).limit(limitNumber);
        const american = await Recipe.find({ 'category': 'American' }).limit(limitNumber);
        const chinese = await Recipe.find({ 'category': 'Chinese' }).limit(limitNumber); */
    
       // const sofas = { latest, thai, american, chinese };

        res.render('index', { title: 'Cookinkg Blog - Home', categories, /* sofas */ } );
    }
    catch(error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

//Get /categories
exports.exploreCategories = async(req, res) => {
    try{
        const categories = await Category.find({});
        res.render('categories', { title: 'Cookinkg Blog - Categories', categories } );
    }
    catch(error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

