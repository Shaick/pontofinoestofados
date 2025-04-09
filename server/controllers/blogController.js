require('../models/database');
const Category = require("../models/Category");
const Sofa = require("../models/Sofa");

//Get homepage
exports.homepage = async(req, res) => {
    try{
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
         const latest = await Sofa.find({}).sort({_id: -1}).limit(limitNumber);
        const reclinavel = await Sofa.find({ 'category': 'Reclinavel' }).limit(limitNumber);
        const couro = await Sofa.find({ 'category': 'Sofa-De-Couro' }).limit(limitNumber);
        const sofacama = await Sofa.find({ 'category': 'Sofa-Cama' }).limit(limitNumber); 
    
       const sofas = { latest, reclinavel, couro, sofacama };
        // enum: ['Sofa-Cama', 'Sofa-De-Couro', 'Reclinavel', 'Pilow-Pop', 'Poltrona'],

        res.render('index', { title: 'Ponto Fino Estofados - Home', categories,  sofas  } );
    }
    catch(error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

//Get /categories
exports.exploreCategories = async(req, res) => {
    try{
        const categories = await Category.find({});
        res.render('categories', { title: 'Ponto Fino Estofados - Categorias', categories } );
    }
    catch(error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

//Get /sofa/:id
exports.exploreSofaById = async(req, res) => {
    try{
        let sofaId = req.params.id;
        const sofa = await Sofa.findById(sofaId);

        res.render('sofa', { title: 'Ponto Fino Estofados - Sofa', sofa } );
    }
    catch(error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

//Get /categories/:id
exports.exploreCategoriesById = async(req, res) => { 
    try {
      let categoryId = req.params.id;
      const limitNumber = 20;
      const categoryById = await Sofa.find({ 'category': categoryId }).limit(limitNumber);
      res.render('categories', { title: 'Ponto Fino Estofados - Categoreis', categoryById } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  } 


   //Post /search
   exports.searchRecipe = async(req, res) => {
    try {
      let searchTerm = req.body.searchTerm;
      let sofa = await Sofa.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
      //res.json(sofa);
      res.render('search', { title: 'Ponto Fino Estofados - Pesquisa', sofa } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
    
  }
  
/**
 * GET /explore-latest
 * Explplore Latest 
*/
exports.exploreLatest = async(req, res) => {
    try {
      const limitNumber = 20;
      const sofa = await Sofa.find({}).sort({ _id: -1 }).limit(/* limitNumber */);
      res.render('explore-latest', { title: 'Ponto Fino Estofados - Explore Latest', sofa } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  } 

  /**
 * GET /explore-random
 * Explore Random as JSON
*/
exports.exploreRandom = async(req, res) => {
    try {
      let count = await Sofa.find().countDocuments();
      let random = Math.floor(Math.random() * count);
      let sofa = await Sofa.findOne().skip(random).exec();
      res.render('explore-random', { title: 'Ponto Fino Estofados - Últimas Postagens', sofa } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  } 

   /**
 * GET /submit-sofa
 * Submit Sofa
*/
exports.submitSofa = async(req, res) => {
  const limitNumber = 10;
  const categories = await Category.find({}).limit(limitNumber);
  //  if(req.session.user){
      const infoErrorsObj = req.flash('infoErrors');
      const infoSubmitObj = req.flash('infoSubmit');
      res.render('submit-sofa', { title: 'Ponto Fino Estofados - Submit Sofa',/*  infoErrorsObj, infoSubmitObj, */ categories  } );
 //   } else {
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/login');
  //  }

  }

/**
 * POST /submit-sofa
 * Submit Sofa
*/
exports.submitSofaOnPost = async(req, res) => {

    try {
  
      let imageUploadFile;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
        console.log('No Files where uploaded.');
      } else {
  
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
  
        uploadPath = require('path').resolve('./') + '/public/uploads' + newImageName;
  
        imageUploadFile.mv(uploadPath, function(err){
          if(err) return res.satus(500).send(err);
        })
  
      }
  
      const newSofa = new Sofa({
        name: req.body.name,
        description: req.body.description,
        cor: req.body.cor,
        ingredients: req.body.ingredients,
        category: req.body.category,
        image: newImageName
      });
      
      await newSofa.save();
  
      req.flash('infoSubmit', 'Sofa has been added.')
      res.redirect('/submit-sofa');
    } catch (error) {
      // res.json(error);
      req.flash('infoErrors', error);
      res.redirect('/submit-sofa');
    }
  }

  exports.updateOnPost = async(req, res) => {

    try {
      let id = req.body.id;
      const { name, description, cor, ingredients, category } = req.body;
      let imageUploadFile;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
        console.log('No Files where uploaded.');
      } else {
  
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
  
        uploadPath = require('path').resolve('./') + '/public/uploads' + newImageName;
  
        imageUploadFile.mv(uploadPath, function(err){
          if(err) return res.satus(500).send(err);
        })
  
      }

      const res = await Sofa.findByIdAndUpdate( id , { name: name, description: description, cor: cor, ingredients: ingredients, category: category , image: newImageName});
  
      req.flash('infoSubmit', 'Post has been Updated.')
      res.redirect('/submit-sofa');
    } catch (error) {
      // res.json(error);
      req.flash('infoErrors', error);
      res.redirect('/submit-recipe');
    }
  }
