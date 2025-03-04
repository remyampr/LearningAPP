import React, { useEffect, useState } from 'react'
import { CartCard } from '../components/user/CartCard'
import { getCartItems, makePaymentOnStripe } from '../services/userServices'
import { useNavigate } from 'react-router-dom';

import {loadStripe} from '@stripe/stripe-js';

export const CartPage = () => {

  const stripePromise=loadStripe(import.meta.env.VITE_PUBLISHED_KEY_STRIPE)

  const [cartItems,setCartItems]=useState([]);
  const [total,setTotal]=useState(0);
  const navigate=useNavigate();


  const updateCartFromChild=(id,totalPrice)=>{
      setCartItems((prev)=> prev.filter(item => item.courseId._id != id) );
      setTotal(totalPrice)
  }

  useEffect(()=>{

    getCartItems().then((res)=>{
      console.log(res.data.courses);
      setCartItems(res.data.courses);
      setTotal(res.data.totalPrice)

     
      
    }).catch((err)=>{
      console.log(err);
      
    })

  },[])

  function EmptyCart(){
    return(
      <div className='flex justify-center items-center flex-col h-screen'>
        <p>Cart is Empty</p>
        <button className="btn btn-primary" onClick={()=>navigate("/courses")}>Get courses</button>
      </div>
    )
  }

  const makePayment=async ()=>{

    const body={
      products:cartItems
    }

    const response=await makePaymentOnStripe(body);

    console.log("Stripe response: ",response);
    console.log("Stripe response sessiond ID: ",response.data.sessionId);

    const session=response.data.sessionId;

    const stripe= await stripePromise;

    if(stripe){
      const result=await stripe.redirectToCheckout({
        sessionId:session
      })
    }
    if(result.error){
      console.log(result.error.message);
      
    }else {
      console.log("Stripe failed to load ");
      
    }
    
    
  }


  return (
   <>
  { cartItems.length ?  <>
   { 
    cartItems.map((item)=> (<CartCard key={item._id} item={item} updateCartFromChild={updateCartFromChild} />))
    }
    <div className='text-right mt-5'>
    <p>TOTAL PRICE :{total}</p>
    <button className='btn bg-green-700 text-white'
    onClick={makePayment}
    >Check out</button>
    </div>
  </>: <EmptyCart/> }
   </>
  )
}
