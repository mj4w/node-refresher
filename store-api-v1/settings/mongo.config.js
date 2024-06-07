import dotenv from 'dotenv';
dotenv.config();


const mongoUri = `mongodb+srv://newMJ:123pogiako@nodexpress.cjbcgx4.mongodb.net/STORE-API?retryWrites=true&w=majority&appName=NodeXpress`;
const mongoDockerUri = process.env.DOCKER_MONGO_URI
export default mongoUri;
