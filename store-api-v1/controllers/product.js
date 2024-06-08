import Product from '../models/product.js';


const getAllProductsStatic = async function(req,res,next) {
    try {
        const search = 'b'
        const products = await Product.find({
            price: {$gt:30}
        }).limit(4)
        res.status(200).json({ message: products,nbHits:products.length })
    } catch (error) {
        next(error)
        console.log(error)
    }
}

const getAllProducts = async function(req,res,next) {
    const { featured, company, name, sort, fields, numericFilters } = req.query
    const queryObject = {}

    // filtering featured 
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    // filtering company
    if (company) {
        queryObject.company = company
    }
    // filtering name
    if (name) {
        queryObject.name = {$regex:name, $options: 'i'}
    }

    // numeric filters e.g price-$gt-40,rating-$gte-4
    if (numericFilters) {
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        )
        const options = ['price','rating'];
        filters = filters.split(',').forEach((item)=>{
            const [field,operator,value] = item.split('-')
            if (options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        })
    }
    console.log(queryObject)

    let result = Product.find(queryObject)

    // sorting e.g -name, -price
    if (sort)  {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

    // fields to call e.g name - show name field
    if (fields){
        const fieldList = fields.split(',').join(' ')
        result = result.select(fieldList)
    }

    // pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit)


    const products = await result 
    res.status(200).json({ products,nbHits: products.length })
}




export {
    getAllProductsStatic,
    getAllProducts
}