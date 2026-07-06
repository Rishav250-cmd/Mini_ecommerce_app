const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');

router.get('/', (req, res) => {
    res.render("index")
});
router.get('/shop',isLoggedIn, (req, res) => {
    res.render("shop")
});
router.get('/cart',isLoggedIn, (req, res) => {
    res.render("cart")
}); 

module.exports = router;