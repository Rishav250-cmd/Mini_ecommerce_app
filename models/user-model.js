const { required } = require('joi');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
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
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : "products",
        

    }],
    Orders:{
        type: Array,
        default: []
    },
    contact:{
        type: Number,
    },
    picture: String 
});

module.exports = mongoose.model('user', userSchema);

