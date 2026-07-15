const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');

if(process.env.NODE_ENV === 'development'){
    router.post('/create',async function(req,res){
    let owners =await ownerModel.find();
    if(owners.length>0){
        res.status(400).send("Owner already exists");   
    } 
    let{name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(400).send("Please provide all the required fields");
    }   
    let createdowner = await ownerModel.create({
        name: name,
        email: email,
        password: password
    })
    res.send("We can create new owner");
  });
}

router.get('/create-product',(req, res) => {
    let success =req.flash('success');
    res.render('createproduct',{success});
});

module.exports = router;