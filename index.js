const express =require("express");
const app=express();
const path=require("path")
const methodoverride=require("method-override");

const{v4:uuidv4} =require ("uuid");

const port=5204;
app.use(methodoverride("_method"))
app.use(express.urlencoded({extended:true}));//frontend data parse eg:form 
app.use(express.json()); // Middleware to parse JSON request body

app.set("view engine","ejs");//backend data parse
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));



let posts=[
    {   
        id:uuidv4(),
        username:"@sonya23sk",
        content:"Hello kartiki...iskon la geli hotis ky...?"
    },
    {  
         id:uuidv4(),
        username:"@kartiki4sk",
        content:"Hello sonya...Hoo iskon la geli hoti mi aaj.."
    },
    {  
         id:uuidv4(),
        username:"@outputresult",
        content:"conversation done successfully..."
    }
]



app.get("/posts",(req,res)=>{
 res.render("index.ejs",{ posts });
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
    let id=uuidv4();
    let { username , content } = req.body;
    posts.push({ id,username,content });
    res.redirect("/posts")

})
app.get("/posts/:id",(req,res)=>{
  let {id}=req.params;
  let post=posts.find((p)=>id===p.id);
  res.render("show.ejs",{post});
})
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newcontent;
    console.log(post)
   res.redirect("/posts")
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id); 
    res.render("edit.ejs" ,{ post })
})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=>id!==p.id);
   res.redirect("/posts");

})




























app.listen(port,()=>{
    console.log(`the app is listening on port ${port}`)
}) 