require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
const port = process.env.PORT || 3005


const cors = require('cors')
app.use(cors())

app.get('/', (req, res, next) => {
    res.status(200).json({message: 'server is running', data: 'data'})
})

app.use('/course', require('./routes/course_route'))

///unknown route
app.use("/*", (req, res, next) => {
    let err = new Error("Route Not Found");
    err.status = 404;
    next(err);
});
  
///error handling
app.use((err, req, res, next) => {
    var code = err.status || 500;
    res.status(code == 200 ? 500 : code).json({
      status: false,
      message: err.message,
      data: null,
    });
});

app.listen(port, () => console.log('Server is running on ', port))




