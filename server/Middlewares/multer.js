const multer=require("multer");

const storage=multer.diskStorage({
    filename:function(req,file,cb){
        // null indicates error so no error
        cb(null,file.originalname)
    }
})
const upload=multer({storage:storage})
// upload is middleware we set here

module.exports=upload