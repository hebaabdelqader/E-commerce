import mongoose from "mongoose";
import { Schema,model } from "mongoose";
const categorySchema= new Schema({
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
   // createdBy:{type:Types.ObjectId,reg:'User'},
    //updatededBy:{type:Types.ObjectId,reg:'User'},
},
{
    timestamps:true,
}
);
const categoryModel= mongoose.model.Category ||model('Category',categorySchema);
export default categoryModel;