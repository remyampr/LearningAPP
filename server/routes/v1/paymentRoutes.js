
const paymentRouter=require('express').Router();

const { paymentFunction } = require('../../controllers/paymentController');
const { authUser } = require('../../Middlewares/authUser');




paymentRouter.post("/makepayment",authUser,paymentFunction);

module.exports=paymentRouter