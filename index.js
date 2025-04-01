const { log } = require("console");
const express =require("express");
const app=express();
const path=require("path")

const port=5204;
app.use(express.urlencoded({extended:true}));//frontend data parse eg:form 
// app.use(express.json()); // Middleware to parse JSON request body

app.set("view engine","ejs");//backend data parse
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));



let posts=[
    {   id:"1a",
        username:"@sonya23sk",
        content:"Hello kartiki...iskon la geli hotis ky...?"
    },
    {   id:"2b",
        username:"@kartiki4sk",
        content:"Hello sonya...Hoo iskon la geli hoti mi aaj.."
    },
    {   id:"3c",
        username:"@outputresult",
        content:"conversation done successfully..."
    }
]


app.listen(port,()=>{
    console.log(`the app is listening on port ${port}`)
})
app.get("/posts",(req,res)=>{
 res.render("index.ejs",{ posts });
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
    let { username , content } = req.body;
    posts.push({username,content });
    res.send("Post request working successfully...")

})
app.get("/posts/:id",(req,res)=>{
  let {id}=req.params;
  let post=posts.find((p)=>id===p.id);
  res.render("show.ejs",{post});
})