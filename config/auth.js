//logout hoye gele er pore jeno dashboard e url diye access korte na pari seta check korbo

module.exports = {
    ensureAuthenticated : function (req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg' , 'Please login to access this page');
        res.redirect('/users/login');
    }
};