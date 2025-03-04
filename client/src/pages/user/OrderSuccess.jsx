import React, { useEffect } from 'react'
import { clearCartItems } from '../../services/userServices'

export const OrderSuccess = () => {

    useEffect(()=>{
        clearCartItems().then((res)=>{
            console.log(res);
            
        }).catch((error)=>{
            console.log(error);
            
        })
    })

  return (
   <div>
    <p>
        ORDER PLACED SUCCESSFULLY
        <button className='btn bg-blue-50'>view details</button>
    </p>
   </div>
  )
}
