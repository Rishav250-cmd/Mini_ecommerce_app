const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    image:Buffer,
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


module.exports = mongoose.model('products', productSchema);

