const express =require("express");
const app=express();
const path=require("path")

const port=5204;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.set(express.urlencoded({extended:true}));

let posts=[
    {
        username:"@sonya23sk",
        content:"Hello kartiki...iskon la geli hotis ky...?"
    },
    {
        username:"@kartiki4sk",
        content:"Hello sonya...Hoo iskon la geli hoti mi aaj.."
    },
    {
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