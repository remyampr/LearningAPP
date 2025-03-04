import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userSignup } from '../../services/userServices'
import { toast } from 'react-toastify'

export const Signup = () => {

const [values,setValues]=useState({
  name:"",
  email:"",
  phone:"",
  password:"",
  confirmpassword:""
})
const navigate=useNavigate();
const onSubmit=()=>{
  // console.log("values in state :",values);
  userSignup(values).then((res)=>{
    console.log("res",res);
    toast.success("signup success");
    navigate("/")
    }).catch(err=>{
       console.log("error",err)
       toast.error(err.response.data.error);
      //  toast.warning("error"),{position:'top-center'};
      //  toast("error")
      }
    )
  
}


  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <fieldset className="fieldset">
          <label className="fieldset-label">Name</label>
          <input type="text" className="input" placeholder="Name"  name='name'
          onChange={(e)=>{
            setValues({...values,[e.target.name]:e.target.value})
        }}/>

          <label className="fieldset-label">Email</label>
          <input type="email" className="input" placeholder="Email"  name="email"
            onChange={(e)=>{
              setValues({...values,[e.target.name]:e.target.value})
          }}/>

          <label className="fieldset-label">Phone</label>
          <input type="tel" className="input" placeholder="Phone" name='phone'
            onChange={(e)=>{
              setValues({...values,[e.target.name]:e.target.value})
          }} />


          <label className="fieldset-label">Password</label>
          <input type="password" className="input" placeholder="Password" name='password' 
            onChange={(e)=>{
              setValues({...values,[e.target.name]:e.target.value})
          }}/>

          <label className="fieldset-label">Confirm Password</label>
          <input type="password" className="input" placeholder="confirm Password" name='confirmpassword' 
            onChange={(e)=>{
              setValues({...values,[e.target.name]:e.target.value})
          }}/>
      
          <button className="btn btn-neutral mt-4" onClick={onSubmit}>Sign up </button>
          <div className='text-center'>
        Already have an account? 
        <Link to={"/login"} className=' text-blue-600 underline'>Login</Link>
        </div>
        </fieldset>
      </div>
    </div>
  </div>
</div>
  )
}
