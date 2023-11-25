import cartModel from "../../../DB/model/cart.model.js";
export const creatCart = async(req,res)=>{
    const {productId,quantity} =req.body;
    const cart = await cartModel.findOne({userId:req.user._id});//ليش ما حطينا باي ايدي لانه اليوزر ايدي مش المفتاح الرئيسي
    if(!cart){
        const newCart = await cartModel.create({
            userId:req.user._id,
            products:{productId,quantity}
        })
        return res.status(202).json({message:"succ",cart});
}
let matchedProduct=false;
//اذا المنتج موجود بالسلة بس بدي اغير كميته
for(let i=0;i<cart.products.length;i++){
if(cart.products[i].productId==productId){
    cart.products[i].quantity=quantity;
    matchedProduct=true;
    break;
}
}
//اذا المنتج مش موجود بالسلة
if(!matchedProduct){
    cart.products.push({productId,quantity});
}
await cart.save();
return res.status(404).json({message:"cart exist",matchedProduct,cart});
    }
export const removeItem = async(req,res)=>{
const {productId} =req.body;
await cartModel.updateOne({userId:req.user_id},{
$pull:{//pullبتحذف من اريه موجودة
    products:{
        productId
    }
}
})
return res.json({message:"ok",})
}
export const clearCart = async(req,res)=>{
    const clear= await cartModel.updateOne({userId:req.user_id},{products:[]});
    return res.json({message:"ok"})
}
export const getCart =async(req,res)=>{
    const cart = await cartModel.findOne({userId:req.user_id});
    return res.json({message:"ok",cart:cart})
}
    
