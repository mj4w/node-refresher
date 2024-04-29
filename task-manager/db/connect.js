const mongoose = require('mongoose'); // instance

const connectionString = 'mongodb+srv://newMJ:123pogiako@nodexpress.cjbcgx4.mongodb.net/?retryWrites=true&w=majority&appName=NodeXpress'

const connectDb = (url) => {
   return mongoose.connect(connectionString) 
}

module.exports = connectDb
