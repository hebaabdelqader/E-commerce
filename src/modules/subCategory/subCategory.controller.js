import cloudinary from "../../services/cloudinary.js";
import subCategoryModel from "../../../DB/model/subCategory.js";
import categoryModel from "../../../DB/model/category.js";
import slugify from "slugify";


export const createSubCategory =async(req,res)=>{
   const{name,categoryId} =req.body;
   const subCategory = await subCategoryModel.findOne({name});
   if(subCategory){
    return res.status(409).json({message:`subcategory exist ${name}`});
   }

   const category =await categoryModel.findById(categoryId);
   if(!category){
    return res.status(404).json({message:"category not found"});
   }
   const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
    folder:`${process.env.APP_NAME}/subCATEGORIES`})
    const SubCategory= await subCategoryModel.create({name,slug:slugify(name),categoryId,image:{secure_url,public_id}});
    return res.status(201).json({message:'succ',SubCategory});
}

export const getSubCategories =async(req,res)=>{
    const categoryId = req.params.id;
    const category =await categoryModel.findById(categoryId);//اذا موجودة ولا لا
    if(!category){
        return res.status(404).json({message:"category not found"});
    }
    const subcategories = await subCategoryModel.find({categoryId}).
    populate({path:'categoryId'//عشان اجيب معلومات  الكاتيجوري
    });
    return res.status(200).json({message:"succc",subcategories});
}