import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../../services/userServices'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { saveUser } from '../../redux/features/userSlice'


export const LoginPage = () => {

  const navigate=useNavigate();

  const dispath=useDispatch();

  const [values,setValues]=useState({
    email:"",
    password:"",
     })

const onSubmit=()=>{

  console.log("state values :",values);

  userLogin(values).then((res)=>{
    console.log("res :",res);
    toast.success("Login successfull");
    dispath(saveUser(res.data.user));
    navigate("/");
     }).catch((err)=>{
      toast.error(err.response.data.error)
      console.log("error",err)
    }
     )
  
}


  return (
    <div className="hero bg-base-200 ">
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
            <label className="fieldset-label">Email</label>
            <input type="email" className="input" placeholder="Email" name="email"
            onChange={(e)=>{
              setValues({...values,[e.target.name]:e.target.value})
            }}
            />
            <label className="fieldset-label">Password</label>
            <input type="password" className="input" placeholder="Password" name="password"
             onChange={(e)=>{
              setValues({...values,[e.target.name]:e.target.value})
            }}
             />

            <div><a className="link link-hover">Forgot password?</a></div>
            <button className="btn btn-neutral mt-4"
            onClick={onSubmit}
            >Login</button>
          </fieldset>
        <div className='text-center'>
        Don't have an account? 
        <Link to={"/signup"} className=' text-blue-600 underline'>Sign up</Link>
        </div>
        </div>
      </div>
    </div>
  </div>
  )
}
