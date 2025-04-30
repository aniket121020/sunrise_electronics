const express=require("express");
const app=express();
const mongoose = require('mongoose');
const path=require("path");
const Listing=require("./models/listing.js");
const ejsMate=require('ejs-mate');
const methodOverride = require('method-override');


main()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/sunrise');
}

app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(methodOverride("_method"));

let port=8080;

app.get("/sunriseelectronics",(req,res)=>{
    res.render("./listing/index.ejs");
})

// index route
app.get("/listing/view", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listing/view.ejs", { allListings });
  });

  
  // new upload
  app.post("/listing/new",async(req,res)=>{
    const newListing= new Listing(req.body.listing);
    newListing.save();
    res.redirect("/listing/view");
  })


  app.get("/listing/upload", (req, res) => {
    res.render("./listing/upload.ejs");
  });
  
  //show route
  app.get("/listing/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listing/show.ejs", { listing });
  });

  // delete listing
  app.delete("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id,{...req.body.listing });
    res.redirect("/listing/view");
  })

  // privacy
  app.get("/privacy",(req,res)=>{
    res.render("./listing/privacy.ejs");
  })

  // 
  app.get("/terms",(req,res)=>{
    res.render("./listing/terms.ejs");
  })

app.listen(port,()=>{
    console.log(`Listen on port ${port}`);
})