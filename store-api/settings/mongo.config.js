import dotenv from 'dotenv';
dotenv.config();


const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@nodexpress.cjbcgx4.mongodb.net/${process.env.MONGO_HOST}?retryWrites=true&w=majority`;

export default mongoUri;
