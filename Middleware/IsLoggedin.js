const jwt = require('jsonwebtoken');
const usermodel = require('../models/user-model');

module.exports.isLoggedin = async function(req, res, next){
    if(!req.cookies.token){
        res.flash('Unauthorized , you need to login first');
        return res.redirect('/');
    }
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEYS);
        let user = await usermodel
            .findOne({email: decoded.email})
            .select('-password');
        req.user = user;
        next();
    } catch (err) {
        res.flash('Unauthorized , you need to login first');
        return res.redirect('/');
    }
}   