import couponModel from "../../../DB/model/capon.model.js";

export const createcoupon= async (req,res)=>{
 const {name,amount}=req.body;

if( await couponModel.findOne({name})){
return res.json({message:'exist'});
}
const coupon =  await couponModel.create(req.body);
return res.json({message:'succ'});
}
export const getCoupon = async (req,res)=>{
    const coupons = await couponModel.find({isDeleted:false});
    return res.status(200).json({message:"succ",coupons})
}
export const updateCoupon = async (req,res)=>{
const coupon = await couponModel.findById(req.params.id);
if(!coupon){
    return res.status(404).json({message:'coupon not found'});
}
if(req.body.name){
    if( await couponModel.findOne({name:req.body.name}).select('name')){
        return res.json({message:'exist'});
        }
        coupon.name=req.body.name;}
 if(req.body.amount){
            coupon.amount=req.body.amount;
        }
  await coupon.save();   
  return res.status(200).json({message:"succ",coupon})   

}//حذف مؤقت
export const softDelete = async(req,res)=>{
    const {id}=req.params;
    const coupon = await couponModel.findOneAndUpdate({_id:id,isDeleted:false},
        {isDeleted:true},
        {new:true});
    if(!coupon){
        return res.status(200).json({message:"cant",coupon})   
    }
    return res.status(200).json({message:"succ",coupon})   
}
export const hardDelete= async(req,res)=>{
    const {id}=req.params;
    const coupon = await couponModel.findOneAndDelete({_id:id});
    if(!coupon){
        return res.status(200).json({message:"cant",coupon})   
    }
    return res.status(200).json({message:"succ",coupon}) 
}
export const restore = async(req,res)=>{
    const{id}=req.params;
    const coupon = await couponModel.findOneAndUpdate({_id:id,isDeleted:true},
        {isDeleted:false},
        {new:true});
    if(!coupon){
        return res.status(200).json({message:"cant",coupon})   
    }
    return res.status(200).json({message:"succ",coupon})  
}