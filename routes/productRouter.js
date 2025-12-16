import express from "express"
import { createProduct, deleteProduct, getAllProduct, getProductByID, updateProduct } from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.post("/", createProduct)

productRouter.get("/", getAllProduct)

productRouter.get("/:productID", getProductByID)

productRouter.get("/trending", (req,res)=>{
    res.json(
        {message : "trending products endpoint"}
    )
})

productRouter.delete("/:productID", deleteProduct)

productRouter.put("/:productID", updateProduct) 

export default productRouter