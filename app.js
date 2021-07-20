
const express = require("express");
const _ =require("lodash");
const mongoose= require("mongoose");

mongoose.connect("mongodb+srv://admin-porash:test123@cluster0.pfwlo.mongodb.net/blogsDB",{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const homeStartingContent = "The best ideas can change who we are. daily journal is where those ideas take shape, take off, and spark powerful conversations. We’re an open platform where  readers come to find insightful and dynamic thinking. Here, expert and undiscovered voices alike dive into the heart of any topic and bring new ideas to the surface. Our purpose is to spread these ideas and deepen understanding of the world. We’re creating a new model for digital publishing. One that supports nuance, complexity, and vital storytelling without giving in to the incentives of advertising. It’s an environment that’s open to everyone but promotes substance and authenticity. And it’s where deeper connections forged between readers and writers can lead to discovery and growth. Together with millions of collaborators, we’re building a trusted and vibrant ecosystem fueled by important ideas and the people who think about them.";
const contactContent = "Daily Journal is a webapp created by Porash Chauhan an undergradute of IIT bhilai. daily journal is where those ideas take shape, take off, and spark powerful conversations. We’re an open platform where readers come to find insightful and dynamic thinking. Here, expert and undiscovered voices alike dive into the heart of any topic and bring new ideas to the surface. Our purpose is to spread these ideas and deepen understanding of the world.";
const aboutcontent="The best ideas can change who we are. daily journal is where those ideas take shape, take off, and spark powerful conversations. We’re an open platform where  readers come to find insightful and dynamic thinking. Here, expert and undiscovered voices alike dive into the heart of any topic and bring new ideas to the surface. Our purpose is to spread these ideas and deepen understanding of the world. We’re creating a new model for digital publishing. One that supports nuance, complexity, and vital storytelling without giving in to the incentives of advertising. It’s an environment that’s open to everyone but promotes substance and authenticity. And it’s where deeper connections forged between readers and writers can lead to discovery and growth. Together with millions of collaborators, we’re building a trusted and vibrant ecosystem fueled by important ideas and the people who think about them.";

const postSchema= new mongoose.Schema({
  name: String,
  body:String
});

const Post=mongoose.model("blogpost",postSchema);

const app = express();


app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/",function(req,res){
  Post.find({},function(err,element){
    if(!err){
      res.render("home",{homepara:homeStartingContent, newitems:element});

    }

  });
  
  


});

app.get("/about",function(req,res){
  res.render("about",{aboutpara:aboutcontent});
  


});

app.get("/contact",function(req,res){
  res.render("contact",{contactpara:contactContent});

});


app.get("/compose",function(req,res){
  res.render("compose");
})

app.post("/compose",function(req,res){
  const newpost= new Post({
    name:req.body.title, 
    body:req.body.post
  });

  newpost.save(function(err){
    if(!err)
    res.redirect("/");

  });
  
  


}); 

app.get("/post/:postId",function(req,res){
  


const postid=req.params.postId;

Post.findOne({_id:postid},function(err,post){
  if(!err){
    res.render("post",{Individualtitle:post.name,Individualpost:post.body, postid:postid});

  }
});
  
});

app.post("/delete",function(req,res){
  const idDelete= req.body.button;

  Post.findByIdAndRemove(idDelete,function(err){

  if(!err){

    console.log("successfully deleted");

  }

  res.redirect("/");

});

});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
