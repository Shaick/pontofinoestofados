const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
//const mongoose = require('mongoose');
// mongoose.set('strictQuery', false);

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('PFESecure'));
app.use(session({
    secret: 'PFESecretSession',
    saveUninitialized: true,
    resave: true
  }));
app.use(flash());
app.use(fileUpload());
 

app.set('layout', './layouts/main');
app.set('views', './server/views');
app.set('view engine', 'ejs');

const routes = require('./server/routes/blogRoutes.js');
app.use('/', routes);

app.listen(port, () => console.log(`Listening to port ${port}`));
