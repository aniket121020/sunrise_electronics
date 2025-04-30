const mongoose = require('mongoose');

let Schema= mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image: String,
    price:Number
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;