'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

const postRouter = require('./routes/post.route');
const errorHandler = require('./error-handlers/500');
const notFoundHandler = require('./error-handlers/404');

app.use(cors());
app.use(express.json());
app.use(postRouter);

// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: 'Home Page',
//         code: 200
//     })
// })

app.get('/', (req, res) => {
    res.status(200).send('Home Page')
})

app.use(errorHandler);
app.use(notFoundHandler);

function start(port) {
    app.listen(port, () => console.log(`Server is starting on port ${port}`))
}

module.exports = {
    app,
    start
};