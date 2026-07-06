const { registerSchema } = require('../utils/validation');
const usermodel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generatetoken} = require('../utils/generatetoken');


module.exports.registerUser = async function(req, res){
try{
    let {name , email, password} = req.body;
    let newuser = await usermodel.findOne({email: email});
    if(newuser){
    req.flash('error', 'User already exists, Please Login');
    return res.redirect('/');
    }

    const { error } = registerSchema.validate(req.body);
    if (error) {
    req.flash('error', error.message);
    return res.redirect('/');
    }
    bcrypt.genSalt(10, async function(err,salt){
        bcrypt.hash(password, salt, async function(err, hash){
            if(err) throw err;
            else {
                const createduser = await usermodel.create({
                name, password : hash, email 
                })
               
                const token = generatetoken(createduser);
                res.cookie('token', token, { httpOnly: true });
                req.flash('success', 'User registered successfully, please login');
                return res.redirect('/');

            }
        })
    })
   }catch(err){
    console.log(err.message);
    res.status(500).send('Internal Server Error');
   }
};

module.exports.loginUser = async function(req, res){
    let {email, password} = req.body;
    let user = await usermodel.findOne({email:email});
    if (!user) {
    req.flash('error', 'Invalid email or password');
    return res.redirect('/');
    }
    bcrypt.compare(password, user.password , function(err , result){
        if(result){
            let token = generatetoken(user);
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/shop');
        }
        else{
            req.flash('error', 'Invalid email or password');
            return res.redirect('/');
        }

    })
}
