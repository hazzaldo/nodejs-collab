const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const phoneRouter = require('./routes/phones.routes')

const app = express()
const port = process.env.NODE_PORT

app.use(express.json())

//connect to DB
mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, 
(err) => {
    try {
        console.log(`Server connected successfully to MongoDB`)
    } catch (err) {
        console.log(err)
    }
})

//Routers
app.use('/phones', phoneRouter)

app.get('/', (req, res) => res.send('Hello World - So-sure-itw !'))

//////////////////////////////////////// ERROR HANDLING /////////////////////////////////////////////////

// Handle any other undefined route as a 404 with custom error message
app.use((req, res, next) => {
    const err = new Error("Failed. Phone not found");
    err.status = 404;
    next(err);
});
  
// Error Handler: pass error object for express to handle here from any other request, using 'next(err)'. Here we either output the error caught, if status is not set on error then set error status to 500
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            // send the error message to the client
            message: err.message
        }
    })
});

app.listen(port, () => console.log(`Example app listening at http://localhost:1337 from the host or http://localhost:${port} from vagrant`))
