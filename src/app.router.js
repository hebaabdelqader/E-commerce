import { Router } from 'express';
import categoriesRouter from './modules/categories/categories.router.js';
import productsRouter from './modules/products/products.router.js';
import authRouter from './modules/auth/auth.router.js';
import connectDB from '../DB/connection.js';
import subcategoryRouter from './modules/subCategory/subCategory.router.js'
import couponRouter from './modules/coupon/coupon.router.js';
import cartRouter from './modules/cart/cart.router.js';
import { sendEmail } from './services/email.js';
import quran from 'quran';
const router=Router();
const initApp=(app,express)=>{
    app.use(express.json());
   // sendEmail("hebaa7418@gmail.com","test","<h2>h</h2>");
    connectDB();
    app.get('/',(req,res)=>{
        return res.status(400).json({message:'welcome'});
    });
    app.use('/cart',cartRouter);
    app.use('/subCategory',subcategoryRouter);
    app.use('/auth',authRouter);
    app.use('/categories',categoriesRouter);
    app.use('/products',productsRouter);
    app.use('/coupon',couponRouter)

}
export default initApp;