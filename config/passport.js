const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose'); //login page e user er info check korbo tai mongoose lagbe amar

const bcrypt = require('bcryptjs'); //password bcrypt krcilam now decrypt kora lagbe

//Load user model

const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{
           //Match user
           User.findOne({email: email})
               .then(user =>{
                   if (!user)
                   {
                       //if no match
                       return done(null , false , {message: 'That email is not registered.'});
                   }

                   //match password
                   bcrypt.compare(password, user.password, (err, isMatch)=>{
                        if (err) throw err;
                        
                        if (isMatch){
                            return done(null, user);
                        }else
                        {
                            return done(null, false, {message: 'Password is not correct'});
                        }
                   } );
               })
               .catch(err => console.log(err));
        } )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

}