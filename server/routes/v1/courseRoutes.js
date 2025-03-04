const courseRouter=require("express").Router();
const {create,courseDetails,listCourses,updateCourse,courseDelete}=require("../../controllers/courseController");
const {authAdmin} = require("../../Middlewares/authAdmin");
const upload=require("../../Middlewares/multer")

courseRouter.post("/create",authAdmin,upload.single("image"),create);
courseRouter.put("/update/courseId",authAdmin,upload.single("image"),updateCourse);
courseRouter.get("/coursedtails/:courseId",courseDetails);
courseRouter.delete("/coursedelete/:courseId",authAdmin,courseDelete);
courseRouter.get("/listcourses",listCourses);

module.exports=courseRouter