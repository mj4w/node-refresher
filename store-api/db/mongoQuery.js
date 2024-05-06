import mongoUri from "../settings/mongo.config";



// export const mongoClient = new MongoClient(mongoUri, {
//     retryWrites: false,
//     minPoolSize: 1,
//     maxPoolSize: 5,
//     maxIdleTimeMS: 0,
//     serverSelectionTimeoutMS: 60000,
//     socketTimeoutMS: 0,
//     connectTimeoutMS: 0,
//     keepAlive: true
// });
export default mongoUri;