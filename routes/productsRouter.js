const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productmodel = require('../models/product-model');


router.post('/create', upload.single('image'), async (req, res) => {
    try{let {image , name, price, Discount, bgcolor, panelcolor, textcolor} = req.body;
    let products = await productmodel.create({
        image: req.file.buffer,
        name,
        price,
        Discount,
        bgcolor,
        panelcolor,
        textcolor
    });
    req.flash('success', 'Product created successfully');
    res.redirect('/owners/create-product');
}
    catch(err){
        req.flash('error', 'Something went wrong');
        res.redirect('/owners/create-product');
    }
});

module.exports = router;