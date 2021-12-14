const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    size:{
        type:Array
    },
    color:{
        type:Array
    },
    inStock:{
        type:Boolean,
        default:true,
    },
});


const Product = mongoose.model('Product',productSchema);

module.exports = Product;