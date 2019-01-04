//  /login or /register eigula thakbe users.js file e

//getting the User model
const User = require('../models/User');

//amar express router lagbe tai express import korbo first e

const express = require('express');
const router = express.Router();//express router use korlam
const bcrypt = require('bcryptjs');
const passport = require('passport');

/// Routes for Login starts
//router.get('/login', (req, res) => res.send('Welcome to Login page'));
/*
* only / mane homepage. get method use korteci.. homepage er 2ta method dilam request and response
* response hishebe page e "Welcome to home page" lekhata dekhabe..
* */

router.get('/login', (req, res) => res.render('login'));//login.ejs file ta render korlam jokhn /login page e jabo


/// Routes for Login ends

/// Routes for Register starts
//router.get('/register', (req, res) => res.send('Welcome to Register page'));
router.get('/register', (req, res) => res.render('register'));//register.ejs file ta render korlam jokhn /reginster page e jabo


/// Routes for Register ends

//register handle starts
router.post('/register', (req, res) =>{
    //console.log(req.body)//register button e click korle form er data gula sob req.body te store hocce console.log korle dekhte parbo
    //res.send('Hello')//registration howar por Hello message dekhacce

    const {name, email, password, password2} = req.body;//register.ejs file e protita field ke name  diye target kore data gula tule anteci
    //validation starts
    let errors = [];

    //check required fields

    if (!name || ! email || ! password || !password2 )
    {
        errors.push({msg: 'Please fill in all the fields.'});
    }

    //check password match

    if (password !== password2)
    {
        errors.push({msg: 'Password did not match.'});
    }

    //check if the password is atleast 6 characters long

    if (password.length<6)
    {
        errors.push({msg: 'Password should be atleast 6 characters.'});
    }

    if (errors.length>0)
    {
        //registration e error thakle ami form ta abar re-render korate chai
        res.render('register', {
            //jodi error thake page ta rerender kore kon kon jaygay error seta bolbo
            //tar jonno value gula to get kora lagbe. tai value gula pass kore dilam.
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else
    {
        //res.send('All the credentials are valid.');

        //validation successful hole
        User.findOne({email: email}) //check korteci user unique kina. findOne() hocce mongoose er 1ta methos
            .then(user =>{
                if (user)
                {
                    //jodi user already thake tahole registration form ta re-render korbo
                    errors.push({msg: 'User already exists.'});
                    res.render('register', {
                        //jodi error thake page ta rerender kore kon kon jaygay error seta bolbo
                        //tar jonno value gula to get kora lagbe. tai value gula pass kore dilam.
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                }else{
                    const newUser = new User({
                        name,
                        email,
                        password
                    });//validation successful hole new 1ta user create korbo

                    //console.log(newUser);
                    //res.send('hello new user');

                    // hash encrypt password
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password,salt, (err, hash)=> {
                        if (err) throw err;
                        //setting new hashed password to user
                        newUser.password = hash;
                        //save user to database
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered. You can login now')
                                res.redirect('/users/login');
                            }) // user db te save kora hole login page e redirect korbo
                            .catch(err => console.log(err));

                    }) )
                }
            });


    }

    //validation ends
});

//register handle ends

//Login handle starts

router.post('/login', (req, res, next) => {
    passport.authenticate('local' ,{
            successRedirect: '/dashboard', //login successful hole dashboard page e redirect hobo
            failureRedirect: '/users/login',
            failureFlash: true
    })(req, res, next);
});

//Login handle ends

//Logout handle starts

router.get('/logout', (req , res) => {
    req.logout();
    req.flash('success_msg' , 'You are logged out');
    res.redirect('/users/login');
} );

//Logout handle ends


module.exports = router;

