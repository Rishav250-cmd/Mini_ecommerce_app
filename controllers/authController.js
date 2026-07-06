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
        return res.status(400).send('User already exists , Please Login ');
    }

    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.message);
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
                res.send('User registered successfully');

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
    if(!user){
        return res.status(400).send('Email or Password is incorrect');
    }
    bcrypt.compare(password, user.password , function(err , result){
        if(result){
            let token = generatetoken(user);
            res.cookie('token', token, { httpOnly: true });
            res.send('Login Successful');
        }
        else{
            res.status(400).send('Email or Password is incorrect');
        }

    })
}
