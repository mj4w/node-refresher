import dotenv from 'dotenv';

dotenv.config()

const environment = {
    port: process.env.PORT,
    host: process.env.HOST,
    mongo_uri: process.env.MONGO_URI,
    pass_key: process.env.PASS_SECURITY,
    jwt_key: process.env.JWT_SECURITY,
}


export default environment;