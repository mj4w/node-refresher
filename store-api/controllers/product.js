
const getAllProductsStatic = async function(req,res,next) {
    res.status(200).json({ msg: "Product Testing Route" })
}

const getAllProducts = async function(req,res,next) {
    res.status(200).json({ msg: "Product Route" })
}


export {
    getAllProductsStatic,
    getAllProducts
}