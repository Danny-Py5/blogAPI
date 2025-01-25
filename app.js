const express = require('express');
const postRoute = require('./route/post.js');
const connectDB = require('./db/connect.js');
require('dotenv').config();
const errorHandlerMiddleWare = require('./meddleware/error-handler.js');

const app = express();

const PORT = 5000;


app.use(express.static('./static'))
app.use(express.json());
app.use('/api/v1/posts', postRoute);

// error handler middleware 
app.use(errorHandlerMiddleWare);


async function startServer() {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log('Server Starting at port: ', PORT, '...')
        });
    } catch (error) {
        console.log(error)
    }
};

startServer();