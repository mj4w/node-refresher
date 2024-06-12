import dotenv from 'dotenv';

dotenv.config()

const environment = {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
}


export default environment;