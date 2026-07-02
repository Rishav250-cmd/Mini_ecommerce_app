const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true 
    },  
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    product:{
        type: Array,
        default: []
    },
    picture: String ,
    gstin:String 
});

mongoose.exports = mongoose.model('owner', ownerSchema);

