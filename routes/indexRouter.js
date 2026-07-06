const express = require('express');
const router = express.Router();
const { isLoggedin } = require('../Middleware/IsLoggedin');
router.get('/', (req, res) => {
    let error = req.flash('error');
    let success = req.flash('success');
    res.render("index", {error, success});
});
router.get('/shop',isLoggedin, (req, res) => {
    res.render("shop")
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