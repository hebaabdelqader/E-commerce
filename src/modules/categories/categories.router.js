import { Router } from "express";
import fileUpload, { fileValidation } from "../../services/multer.js";
import * as categoriesController from './categories.controller.js';
import subCategoryRouter from './../subCategory/subCategory.router.js';
import auth  from "../../middlewarre/auth.js";
import  endPoint from "./category.endpoint.js";
const router=Router();
router.use('/:id/sub/subCategory',subCategoryRouter);
router.get('/',auth(endPoint.getAll),categoriesController.getCeteg);
router.get('/Active',categoriesController.getActiveCategory);
router.get('/:id',categoriesController.getSpecifCategory);

router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),categoriesController.creatCategory);
router.get('/categories',categoriesController.cat);
router.put('/:id',fileUpload(fileValidation.image).single('image'),categoriesController.updateCategory)
export default router;
