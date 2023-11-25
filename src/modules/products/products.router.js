import { Router } from "express";
import * as prouductsController from './products.controller.js';
import auth  from "../../middlewarre/auth.js";
import endPoint from "./product.endPoint.js";
import fileUpload, { fileValidation } from "../../services/multer.js";

const router=Router();
router.get('/',prouductsController.pro);

router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImages',maxCount:4},
]),prouductsController.createProduct);
export default router;
