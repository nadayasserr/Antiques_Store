const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true,
        // unique:true,
        // index:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    owner:{
        type:String,
        required:true,
    },
    condition:{
        type:String,
        required:true,
    },
    category: { 
        type: String, 
        required: true 
    },
    // category:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Category",
    //     required:true,
    // },
    quantity: Number,
    sold: {
        type: Number,
        default: 0,
    },
    description:{
        type: String,
        required:true,
    },
    price:{
        type: Number,
        required:true,
    },
    // sold: {
    //     type: Number,
    //     default: 0,
    // },
    images: {
        type: Array,
    },
},
{timestamps: true}
);

//Export the model
module.exports = mongoose.model("Product", productSchema);