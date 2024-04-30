const mongoose = require('mongoose'); // instance

const connectDb = (url) => {
   return mongoose.connect(url) 
}

module.exports = connectDb
