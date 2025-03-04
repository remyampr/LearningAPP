const {uploadToCloudinary}=require("../utilities/imageUpload")
const courseDb=require("../models/courseModel");
const { image } = require("../config/clouudinaryConfig");

const   create=async (req,res)=>{

try{

const {title,description,duration,price}=req.body;
if(!title || !description || !duration || !price){
    return res.status(400).json({error:"All fields are required"})
}

if(!req.file){
    return res.status(400).json({error:"image not found"})
}

const cloudinaryRes=await uploadToCloudinary(req.file.path)

console.log(cloudinaryRes,"image uploaded by cloudinary");

const newCourse=new courseDb({
    title,description,duration,price,image:cloudinaryRes
})
let savedCourse=await newCourse.save();
if(savedCourse){
    return res.status(200).json({msg:"course added",savedCourse})
}

}catch(error){
    console.log(error);
    res.status(error.status || 500).json({error:error.message || "internal server error"})
   
}
}



const listCourses=async(req,res)=>{
    try {

        const courseList=await courseDb.find();
        res.status(200).json({msg:courseList})
        
    } catch (error) {
       
            console.log(error);
        res.status(error.status || 500).json({error:error.message || "internal server error"})
       
    }
}

const courseDetails=async(req,res)=>{
    try {
        const {courseId}=req.params;

     const  courseDetail=await courseDb.findById({_id:courseId})

     if(!courseDetail){
        res.status(400).json({error:"course not found"})
     }
     res.status(200).json({msg:courseDetail})

        
    } catch (error) {
        console.log(error);
    res.status(error.status || 500).json({error:error.message || "internal server error"})
   
    }
}

const updateCourse=async(req,res)=>{
    try {
        const {courseId}=req.params;
        const{title,description,duration,price}=req.body;
        let imageUrl;

        const isCourseExist=await courseDb.findById(courseId);

        if(!isCourseExist){
          return  res.status(400).json({error:"course not found"})
        }

        if(req.file){
            const cloudinaryRes=await uploadToCloudinary(req.file.path);
            imageUrl=cloudinaryRes;
        }

        const updatedCourse=await courseDb.findByIdAndUpdate(courseId,{title,description,duration,price,image:imageUrl},{new:true});

        res.status(200).json({msg:"course updated",updateCourse})        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error:error.message || "internal server error"})
       
    }
}

const courseDelete=async(req,res)=>{
try{
    const {courseId}=req.params;
    const deleteCourse=await courseDb.findByIdAndDelete(courseId);

    if(deleteCourse){
        return  res.status(400).json({error:"course not found"})
    }
    res.status(200).json({msg:"course deleted"})  

}catch(error){
    console.log(error);
    res.status(error.status || 500).json({error:error.message || "internal server error"})
}
}




module.exports={
    create,
    courseDetails,
    listCourses,updateCourse,
    courseDelete

}