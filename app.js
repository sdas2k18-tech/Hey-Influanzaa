const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT= 5000
const {MONGOURI} = require('./keys')



// const customMiddleware = (req,res,next)=>{
//     console.log("middleware executed!!")
//     next()
// }
//Sdas2k19
//NoHrQDzpX4jCNbmB

//app.use(customMiddleware)
//custom middleware to check authontication 
// app.get('/',(req,res)=>{
//     console.log("home")
//     res.send("Hey Influanzaa!!") 
// })                  // '/' is used to call request and route; need to make request handler for every route.
// app.get('/about',customMiddleware,(req,res)=>{
//     console.log("about")
//     res.send("about page")
// })

require('./models/user')

app.use(express.json())
app.use(require('./routes/auth'))

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("connected to Mongo Yeahh")
})

mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})



app.listen(PORT,()=>{
    console.log("server is running on",PORT)  //callback function
})