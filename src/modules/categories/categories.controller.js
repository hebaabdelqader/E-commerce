import { Router } from "express";
import categoryModel from "../../../DB/model/category.js";
import slugify from "slugify";
import cloudinary from "../../services/cloudinary.js";
const router=Router();
export const cat=(req,res)=>{
   return res.json("categories");
}
export const getCeteg=async(req,res)=>{
   try{
   const categories=await categoryModel.find();
   return res.status(200).json({message:'succ',categories});
   }catch(err){
   return res.json(err);
}
}
export const getSpecifCategory =async(req,res)=>{
   const {id}=req.params;
const specifc=await categoryModel.findById(id);
return res.status(200).json({message:'succ',specifc});
}
export const creatCategory=async(req,res)=>{
   const name=req.body.name.toLowerCase();
   const slugName=slugify(name);
   if(await categoryModel.findOne({name})){
     return res.status(409).json({message:"category name already exists"})
   }
   const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
      folder:`${process.env.APP_NAME}/CATEGORIES`
   }) 
   const ct= await categoryModel.create({name,slug:slugify(name),image:{secure_url,public_id},createdBy:req.user._id,updatededBy:req.user._id});
   return res.json(ct);
}
export const updateCategory=async(req,res)=>{
   try{
      const category=await categoryModel.findById(req.params.id);
      if(!category){
         return res.status(404).json({message:`invalid category id ${req.params.id}`});
      }
      if(req.body.name){
         if(await categoryModel.findeOne({name:req.body.name}).select('name')){
            return res.status(409).json({message:`category ${req.body.name} already exists`})
         }
      
      category.name=req.body.name;
         category.slug=req.body.slug;}
         if(req.body.status){
            category.status=req.body.status;
         }
      if(req.file){
         const {secure_url,public_id}=await cloudinary.uploder.upload(req.file.path,{
            folder:`${process.env.APP_NAME}/CATEGORIES`})
      await cloudinary.uploader.destroy(category.image.public_id);
      category.image={secure_url,public_id};
         }
         await category.save();
         return res.status(200).json({meesage:'success'});
   }catch(err){
      return res.status(200).json({meesage:'error',err:err});
   }}


export const getActiveCategory=  async(req,res)=>{
   try{
const categories=await categoryModel.find({status:'Active'}).select('name image');
return res.status(200).json({meesage:"success",categories});
   }catch(err){
      return res.status(200).json({meesage:"err",err});
   }
   
} 

