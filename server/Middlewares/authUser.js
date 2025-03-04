const jwt=require("jsonwebtoken");

const authUser=(req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            return res.status( 401).json({error: "jwt not found"})
        }

        const verifiedToken=jwt.verify(token,process.env.JWT_SECRET);
        if(!verifiedToken){
            return res.status( 401).json({error: "user not autherized"})
        }
        if(verifiedToken.role !== "user"){
            return res.status( 401).json({error: "Access denied"})
        }
        req.user=verifiedToken.id;
        console.log("req.user",req.user);
        

        next();

    }catch(error){
        console.log(error);
        res.status(error.status || 401).json({error:error.message || "admin autherization failed"})
    }
}

module.exports={authUser}