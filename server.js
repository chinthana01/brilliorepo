const Express = require("express")
const Mongoose = require("mongoose")
const path   = require("path")
const cors = require("cors")
const fs = require("fs")
const server = Express()
const bodyparser = require("body-parser")
const Port =  5050
//const dburl = "mongodb://localhost:27017/brilliodb"
const dburl = "mongodb+srv://dhanupandey:test12345@cluster0.s2usivc.mongodb.net/?retryWrites=true&w=majority"
const corsOptions = {
    exposedHeaders: 'Authorization',
  };
server.use(cors(corsOptions))
// server.use(function(req, res, next) {
    
//     next();
//   });
server.use(Express.static(path.resolve(__dirname,"./build")))
server.use(bodyparser())
server.use('/user', require("./user"))
server.use('/video', require("./video"))


server.listen( Port ,function(){
    Mongoose.connect(dburl,function(error,client){
        if(error){
            console.log("Error in connecting to database", error)
        }
        else{
            console.log("Connected to database")
        }
    })
    console.log("....... serever is listening on" , Port)

})

