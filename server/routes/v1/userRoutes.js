const userRouter=require("express").Router();
const {register,login, logout}=require("../../controllers/userController")

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.post("/logout",logout);



module.exports=userRouter