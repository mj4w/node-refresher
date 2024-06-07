import Product from '../models/product.js';


const getAllProductsStatic = async function(req,res,next) {
    try {
        const products = await Product.find({})
        res.status(200).json({ message: products,nbHits:products.length })
    } catch (error) {
        next(error)
        console.log(error)
    }

}

const getAllProducts = async function(req,res,next) {
    res.status(200).json({ msg: "Product Route" })
}


export {
    getAllProductsStatic,
    getAllProducts
}