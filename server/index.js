const expres=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const apiRouter = require("./routes");
const cookieparser=require("cookie-parser");
require("dotenv").config()

const app=expres();
app.use(expres.json());
app.use(cookieparser());

app.get("/",(req,res)=>{
    res.send("hello from backend");
})

app.use(cors({
    origin:['https://learning-appfrontend.vercel.app', 'http://localhost:5173'],
    credentials: true 
}))

mongoose.connect(process.env.MONGO_URI)
.then((res)=>{
    console.log("Db connection successful");
}).catch((err)=>{
    console.log(err);
})

app.use("/api",apiRouter)

app.listen(process.env.PORT,()=>{console.log(`server starts on ${process.env.PORT}`)})