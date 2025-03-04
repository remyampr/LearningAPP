const userDb = require("../models/userModel");
const { createToken } = require("../utilities/generateToken");
const {hashPassword,comparePassword} = require("../utilities/passwordUtilities");


const register=async (req,res)=>{
    try{
        const {name,email,phone,password,confirmpassword}=req.body;

        if(!name || !email || !phone || !password || !confirmpassword){
            return res.status(400).json({error:"All fields are required"})
        }
        if(password !== confirmpassword){
            return res.status(400).json({error:"password doesnot match"})
        }
        // const userExist=userDb.findOne({email:email}); 
        const userExist=await userDb.findOne({email}); 
        if(userExist){
            return res.status(400).json({error:"email already exist"})
        }
        const hashedPassword=await hashPassword(password);
        const newUser=new userDb({
            name,email,phone,password:hashedPassword
        })
        const saved=await newUser.save();
        if(saved){
            const token= createToken(saved._id);
            res.cookie("token",token);
            return res.status(200).json({msg:"user created",user:newUser})
        }


    }catch(error){
        console.log(error);
        res.status(error.status || 500).json({error:error.message || "Internal server error"})
    }

}

const  login =async (req,res)=>{
    try{

        const {email,password}=req.body;

        
        if(!email || !password){
            return res.status(400).json({error:"All fields are required"})
        }
        const userExist=await userDb.findOne({email}); 
        if(!userExist){
            return res.status(400).json({error:"user not exist"})
        }
        const passwordMatch=await comparePassword(password,userExist.password);
        console.log(passwordMatch);
        if(!passwordMatch){
            return res.status(400).json({error:"Password not match"})
        }
        const token= createToken(userExist._id);
        res.cookie("token", token, {
            httpOnly: true,    // Prevents client-side access (security)
            secure: true,      // Ensures cookies are sent over HTTPS
            sameSite: "None"   // Allows cross-origin requests (important for frontend-backend on different domains)
        });
        return res.status(200).json({message:"user Login successful",user:userExist,Token : token})


    }catch(error){
        console.log(error);
        res.status(error.status || 500).json({error:error.message || "Internal server error"})
    }
}

const logout=async (req,res)=>{
    try{
        res.clearCookie("token")
        res.status(200).json({messageg:"logout"})
    }catch(error){
            console.log(error);
            res.status(error.status || 500).json({error:error.message || "Internal server error"})
        }
    }



module.exports={
    register,
    login,
    logout
}