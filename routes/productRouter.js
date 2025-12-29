import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProductByID, updateProduct } from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.post("/", createProduct)

productRouter.get("/", getAllProducts)

productRouter.get("/:productID", getProductByID)

productRouter.get("/trending", (req,res)=>{
    res.json(
        {message : "trending products endpoint"}
    )
})

productRouter.delete("/:productID", deleteProduct)

productRouter.put("/:productID", updateProduct) 

export default productRouter