//  /home or /product eigula thakbe index.js file e

//amar express router lagbe tai express import korbo first e

const express = require('express');
const router = express.Router();//express router use korlam
const {ensureAuthenticated} = require('../config/auth');// user logged in na thakle dashboard page e jeno dhukte na pare sejonno authentication ta include kore nibo. joto page e erokom security drkar sob page e eta include kore nibo.


//router.get('/', (req, res) => res.send('Welcome to hame page'));
/*
* only / mane homepage. get method use korteci.. homepage er 2ta method dilam request and response
* response hishebe page e "Welcome to home page" lekhata dekhabe..
* */
//welcome page
router.get('/', (req, res) => res.render('welcome'));//home page e welcome.ejs file ta render korteci

//dashboard page
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard' , {
    name: req.user.name //dashboard page e Welcome user_name dekhabo so username ta pathalam.
}));

module.exports = router;