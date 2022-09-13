const Express = require("express")    //old way of getting express package
//import Express from "express"   // ES 6
const Mongoose = require("mongoose")
const dburl = "mongodb://localhost:27017/brilliodb"
const server = Express()
const port = 5050
const path = require("path")
const cors = require("cors")
const fs = require("fs")
const corsOptions ={



  exposedHeaders:"Authorization",



}
server.use(Express.json())   //middleware
server.use(cors(corsOptions))
server.use(Express.static(path.resolve(__dirname,"./build")))  //middleware
server.use('/user',require("./user"))
server.use('/video',require("./video"))
//server.use('/story',require("./story"))
// //Get Function
// server.get("/", function(req,resp){
//   //resp.send("Hello, Welcome to our application")
//   resp.sendFile(path.resolve(__dirname,"./build/index.html"))
// })
// //Post function
// server.post("/signup", function(req,resp){
//   //resp.send("Hello from server")
//     //resp.json(req.body)
//     console.log(req.body)
//     fs.appendFile("users.txt", JSON.stringify(req.body),function(error){
//       console.log("error in appending file", error)
//         if(error){
//           resp.status(500).send()
//         }
//         else{
//           resp.send("Done")
//         }
//     })
//     //Validate user
//     fs.readFile("./users.txt", "utf-8", function(err, data){
//         if(err)
//         console.log("Error while reading", err)
//         console.log("Data: ", data)
//     })
// })
server.listen(port, function(){
  Mongoose.connect(dburl,function(error,client){
    if(error)
      console.log("Error connecting to database", error)
    else{
        console.log("Connected to database")
    }
  })
  console.log("Server is listening on port...", port)
})

