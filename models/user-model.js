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
    cart:{
        type: Array,
        default: []
    },
    isadmin:{
        type: Boolean,
        default: false
    },
    Orders:{
        type: Array,
        default: []
    },
    contact:{
        type: Number,
    },
    picture: String 
});

mongoose.exports = mongoose.model('user', userSchema);

