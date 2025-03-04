
const cartRouter=require('express').Router();

const { addToCart, getCart, removeFromCart, clearCart } = require('../../controllers/cartController');
const { authUser } = require('../../Middlewares/authUser');




cartRouter.post("/addtocart/:courseId",authUser,addToCart);
cartRouter.get("/getcart",authUser,getCart);
cartRouter.delete("/removefromcart/:courseId",authUser,removeFromCart);
cartRouter.post("/clearcart",authUser,clearCart);

module.exports=cartRouter