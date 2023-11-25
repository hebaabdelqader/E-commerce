import categoryModel from "../../../DB/model/category.js";
import subCategoryModel from "../../../DB/model/subCategory.js";
import { Router } from "express";
import slugify from "slugify";
import productModel from "../../../DB/model/product.model.js";
import userModel from "../../../DB/model/user.model.js";
import cloudinary from "../../services/cloudinary.js";
const router=Router();
export const pro=(req,res)=>{
   return res.json("proudects");
}
export const createProduct =async(req,res)=>{
   const {name,price,discount,categoryId,subCategoryId}=req.body;
   const checkCategory = await categoryModel.findById(categoryId);
   if(!checkCategory){
      return res.status(404).json({message:"category not found"})
   }
   const checkSubCategory = await subCategoryModel.findById(subCategoryId); 

   if(!checkSubCategory){
      return res.status(404).json({message:"sub category not found"})
   }
   req.body.slug=slugify(name);//اذا ما بعث قيمة دسكاونت بكون فولس
   req.body.finalPrice = price -(price *(discount||0)/100);// req.filesImage[0]معلومات الصورة الاولى 
   //بعدين بجيب الباث اللي الها .path
   //بعدين بحطهم بفولدر عشان بالكلودينري بنشأ مجلد لالها
   const {secure_url,public_id}=await cloudinary.uploader.upload(req.files.mainImage[0].path,{
      folder:`${process.env.APP_NAME}/product/${req.body.name}/mainImage`})
   req.body.mainImage={secure_url,public_id};//اعطينا قيمة المين اميج نفس قيمة الصورة المبعوثة اللي حفظناها بهدول
 
   req.body.subImages=[];
   for(const file of req.files.subImages){
      const {secure_url,public_id}=await cloudinary.uploader.upload(file.path,{
         folder:`${process.env.APP_NAME}/product/${req.body.name}/subImages`});
   }
   req.body.createdBy=req.user._id;
  req.body.updatededBy=req.user._id;  
   const product =await productModel.create(req.body);
   if(!product){
   return res.status(400).json({message:"error while creating product"});
   }
   return res.status(201).json({message:"succ",product})
}
