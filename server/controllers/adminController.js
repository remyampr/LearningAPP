const adminDb=require("../models/adminModel")
const { createToken } = require("../utilities/generateToken");
const {hashPassword,comparePassword} = require("../utilities/passwordUtilities");


const register=async (req,res)=>{
    try{
        const {email,password}=req.body;
        if( !email  || !password ){
            return res.status(400).json({error:"All fields are required"})
        }
         const alreadyExist=await adminDb.findOne({email}); 
                if(alreadyExist){
                    return res.status(400).json({error:"email already exist"})
                }
                const hashedPassword=await hashPassword(password);
        const newAdmin=new adminDb({
            email,password:hashedPassword
        })
        const saved=await newAdmin.save();
        if(saved){
            
            return res.status(200).json({msg:"Admin created",admin:saved})
        }


    }catch(error){
        console.log(error);
        res.status(error.status || 500).json({error:error.message || "Internal server error"})
    }
}

const login=async (req,res)=>{
    try{

        const {email,password}=req.body;

        
        if(!email || !password){
            return res.status(400).json({error:"All fields are required"})
        }
        const adminExist=await adminDb.findOne({email}); 
        if(!adminExist){
            return res.status(400).json({error:"admin not exist"})
        }
        const passwordMatch=await comparePassword(password,adminExist.password);
        console.log(passwordMatch);
        if(!passwordMatch){
            return res.status(400).json({error:"Password not match"})
        }
        const token= createToken(adminExist._id,"admin");
        res.cookie("Admin_token",token);
        return res.status(200).json({msg:"user Login successful",Admin:adminExist})


    }catch(error){
        console.log(error);
        res.status(error.status || 500).json({error:error.message || "Internal server error"})
    }
}

const logout=async (req,res)=>{
try{
    res.clearCookie("Admin_token")
    res.status(200).json({msg:"logout"})
}catch(error){
        console.log(error);
        res.status(error.status || 500).json({error:error.message || "Internal server error"})
    }
}

module.exports={register,login,logout}