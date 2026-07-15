const express = require('express');
const router = express.Router();
const { isLoggedin } = require('../Middleware/IsLoggedin');
const productmodel = require('../models/product-model');
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
    res.render("cart")
}); 
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    req.flash('success', 'Logged out successfully');
    res.redirect('/');
});

module.exports = router;