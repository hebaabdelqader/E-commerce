import  jwt  from "jsonwebtoken";
import userModel from "../../DB/model/user.model.js";
export const roles ={
    Admin:'Admin',User:'User'
}
 const auth= ( accessRoles=[] )=>{
return async (req,res,next)=>{
    const {authorization} =req.headers; //
    if(!authorization?.startsWith(process.env.BERREKEY)){
       return res.json({message:"invalid autherization"});
    }  
const token=authorization.split(process.env.BERREKEY)[1];
const decoded = jwt.verify(token,process.env.LOGINSECRET)

if(!decoded){
    return res.status(400).json({message:"invalid token"});
}
const user =await userModel.findById(decoded.id).select("userName role");
if(!user){
    return res.status(404).json({message:"not regetr"})
}
if(!accessRoles.includes(user.role)){
 return res.status(403).json({message:"no"})
}
req.user=user;
next();
}
 }
 export default auth;

