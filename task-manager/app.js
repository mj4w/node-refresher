const express = require('express');
const tasks = require('./routes/task');
const app = express();

app.use('/api/v1/tasks', tasks)


const port = 3000
app.listen(port, console.log(`Serving on port ${port}`));