import mongoose from "mongoose";
import { Schema,model,Types } from "mongoose";
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
    createdBy:{type:Types.ObjectId,ref:'User',required:"true"},
    updatededBy:{type:Types.ObjectId,ref:'User',required:'true'},
},
{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
);
categorySchema.virtual('subcategory',{
    localField:'_id',
    foreignField:'categoryId',
    ref:'subCategory'
})
const categoryModel= mongoose.models.Category ||model('Category',categorySchema);

export default categoryModel;