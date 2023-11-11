import mongoose from "mongoose";
import { Schema,model, Types } from "mongoose";
const couponSchema= new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    amount:{type:Number,required:true},
    usedBy:[{type:Types.ObjectId,ref:'User'}],
    expireDate:Date,
   createdBy:{type:Types.ObjectId,ref:'User'},
 updatededBy:{type:Types.ObjectId,ref:'User'},
 isDeleted:{
    type:Boolean,
    default:false

 }
},
{
    timestamps:true,
}
);

const couponModel= mongoose.model.Category ||model('coupon',couponSchema);
export default couponModel;