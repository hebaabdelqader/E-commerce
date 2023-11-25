import { Router } from "express";
import * as couponController from './coupon.controller.js';
const router=Router();
router.post('/',couponController.createcoupon);
router.get('/',couponController.getCoupon);
router.put('/:id',couponController.updateCoupon);
router.patch('/softDelet/:id',couponController.softDelete);
router.delete('/hardDelet/:id',couponController.hardDelete);
router.patch('/restore/:id',couponController.restore);
export default router