## Follow this link
[Mongoose](https://mongoosejs.com)

## Using MongoDb Atlas
```
const mongoose = require('mongoose'); // instance

const connectionString = 'mongodb+srv://newMJ:123pogiako@nodexpress.cjbcgx4.mongodb.net/?retryWrites=true&w=majority&appName=NodeXpress'


mongoose.connect(connectionString)
.then(() => (
    console.log('Connected to the DB server')
)).catch((err) => (
    console.log(err)
))
```