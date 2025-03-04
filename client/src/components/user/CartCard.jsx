import React from "react";
import { removeCartItem } from "../../services/userServices";

export const CartCard = ({item,updateCartFromChild}) => {
    console.log("item :" , item);

    const removeItem=(courseId)=>{
        console.log("Remove");
        try {

            console.log("Remove");
            removeCartItem(courseId).then((res)=>{
                console.log("Remove");
                
                console.log("res ::: ",res);
                updateCartFromChild(courseId,res.data.cart.totalPrice)
                
            }).catch((err)=>{
                console.log(err);
                
            })
            
        } catch (error) {
            console.log(error);
            
        }
    }
    
  return (
    <div className=" bg-gray-100 w-full shadow-smb flex items-center justify-between py-5 text-black">
      <figure>
        <img
          src={item.courseId.image}
          alt="Shoes"
          className="h-[100px]"
        />
      </figure>
      <div>
        <p>PRICE : {item.price} </p>
      </div>
      <div className="card-actions justify-end">
        <button className="btn btn-primary"
        onClick={()=>removeItem(item.courseId._id)}
        >Remove</button>
      </div>
    </div>
  );
};
