import React from 'react'
import { addtoCart } from '../../services/userServices';
import { toast } from 'react-toastify'

export const Card = ({course}) => {

const addCourseToCart= (courseId) =>{
  try {
    addtoCart(courseId).then((res)=>{ 
      console.log("res",res);
      toast.success(res.data.message)
        }).catch((err)=>{
          console.log("error ",err);
          toast.error(err.response.data.error)
          
        })
    
  } catch (error) {
    console.log(error);
    
  }

}


  return (
    <div className="card card-side bg-base-100 shadow-xl grid grid-cols-1">
    <figure className='w-full h-48'>
      <img
        src={course.image}
        alt="Movie" className='object-cover w-full h-full' />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{course.title}</h2>
      <p>{course.description}</p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary"
        onClick={()=>addCourseToCart(course._id)}
        >Add to cart</button>
      </div>
    </div>
  </div>
  )
}
