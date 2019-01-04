//imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
//requiring the flash message starts
/*redirect korar por kono message display korate flash message use kora hoy
* jemon register successful hole login page e redirect kore then bolbo "You have successfully registered"
* */
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//requiring the flash message ends
const app = express();

//passport config
require('./config/passport')(passport);

// database config
const db = require('./config/keys').MongoURI;

//connect to mongo
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected....'))
    .catch(err => console.log(err));

//Using EJS in the project
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Body parser(Form theke data pawar jonno use hoy)
app.use(express.urlencoded({extended: false}));

//express session middleware for flash messaging starts
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//express session middleware for flash messaging end

//Routes
app.use('/', require('./routes/index'));//bole dilam je home page er jonno(/) index.js file ta require lagbe
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT} `));