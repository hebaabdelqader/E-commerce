import { Router } from "express";
const router = Router();
import auth from "../../middlewarre/auth.js";
import { endpoints } from "./cart.endPoint.js";
import * as cartController from './cart.controller.js'
router.post('/',auth(endpoints.create),cartController.creatCart);
router.patch('/removeItem',auth(endpoints.delete),cartController.removeItem);
router.patch('/clear',auth(endpoints.clear),cartController.clearCart);
router.get('/',auth(endpoints.get),cartController.getCart);
export default router;