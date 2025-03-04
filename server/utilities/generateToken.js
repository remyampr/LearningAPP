const jwt=require("jsonwebtoken");
const maxAge=3 * 24 * 60 * 60
// 3 days valid

// role default parameter here
// will pass role as admin if its admin otherwise asume it as user
const createToken=(id,role="user")=>{ 
    return jwt.sign({id,role},process.env.JWT_SECRET,{
        expiresIn:maxAge
    })
}


module.exports={createToken}