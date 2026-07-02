const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    image:String,
    name:String,
    price:Number,
    Discount:{
        type:Number,
        default:0
    },
    bgcolor:String,
    panelcolor:String,
    textcolor:String
});


mongoose.exports = mongoose.model('products', productSchema);

