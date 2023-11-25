import mongoose from "mongoose";
import { Schema,model,Types } from "mongoose";
import userModel from "./user.model.js";
const productSchema= new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    slug:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:false,
    },
    stock:{
        type:String,
       default:1,
    },price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        default:0
    },
    finalPrice:{
        type:Number,
    },number_sellers:{
        type:Number,
        default:true
    },
    mainImage:{
        type:Object,
        required:true,
    }, subImage:[{
        type:Object,
        required:true,
    }],
    status:{
        type:String,
        default:'Active',
        enum:['Active','Inactive'],
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    colors:[String],
    sizes:[{
        type:String,
        enum:['s','m','lg','xl'],
    }],
    createdBy:{type:Types.ObjectId,ref:'User',required:"true"},
    updatededBy:{type:Types.ObjectId,ref:'User',required:'true'},
    categoryId:{type:Types.ObjectId,ref:"User",required:'true'},
    subCategoryId:{type:Types.ObjectId,ref:'User',required:'true'}
},
{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
);

const productModel= mongoose.models.Product || model('Product',productSchema);

export default productModel;