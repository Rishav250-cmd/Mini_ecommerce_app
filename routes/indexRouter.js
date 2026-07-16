const express = require('express');
const router = express.Router();
const { isLoggedin } = require('../Middleware/IsLoggedin');
const productmodel = require('../models/product-model');
const usermodel = require('../models/user-model')
router.get('/', (req, res) => {
    let error = req.flash('error');
    let success = req.flash('success');
    res.render("index", {error, success});
});
router.get('/shop',isLoggedin, async (req, res) => {
    let products = await productmodel.find();
    res.render("shop" , {products})
});
router.get('/cart',isLoggedin, (req, res) => {
    
}); 

router.get('/addtocart/:id',isLoggedin, async(req, res) => {
    let user = await usermodel.findOne({user:req.user.email});
    user.cart.push(req.params.productid);
    await user.save();

}); 
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    req.flash('success', 'Logged out successfully');
    res.redirect('/');
});

module.exports = router;