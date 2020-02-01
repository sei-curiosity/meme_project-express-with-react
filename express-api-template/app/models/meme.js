const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
})


const Meme = mongoose.model("Meme",memeSchema);

module.exports = Meme