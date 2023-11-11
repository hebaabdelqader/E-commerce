import mongoose from "mongoose";
import { Schema,model,Types } from "mongoose";
const subCategorySchema= new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    slug:{
        type:String,
        required:true,
    },
    image:{
        type:Object,
        required:true,
    },
    status:{
        type:String,
        default:'Active',
        enum:['Active','Inactive'],
    },
    categoryId:{type:Types.ObjectId,ref:'Category',required:true},
 createdBy:{type:Types.ObjectId,ref:'User'},
   updatededBy:{type:Types.ObjectId,ref:'User'},
},
{
    timestamps:true,
}
);
const subCategoryModel= mongoose.models.subCategory ||model('subCategory',subCategorySchema);
export default subCategoryModel;