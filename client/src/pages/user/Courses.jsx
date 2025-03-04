import React, { useEffect, useState } from 'react';
import { Card } from '../../components/user/Card';
import { axiosInstance } from '../../axios/axiosInstance';
import { listCourses } from '../../services/userServices';

export const Courses = () => {

const [courses,setCourses] = useState([]);
useEffect(()=>{
   listCourses()
    .then((res)=>{  
      // in res there is data from backend
        console.log(res);
        setCourses(res.data.msg);
        console.log(res.data.msg);
        
    }).catch((err)=> console.log(err)
    )
},[])


  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
{
courses && courses.map((course,i)=>(

  <Card key={i}  course={course} />

  // course={course} first one that we defined in Card.jsx like export const Card = ({course})  
  // the course in {} is the one getting from map function ,that course wr are passing to Card Component
))

} 

{/* <Card/> */}

    </div>
  )
}
