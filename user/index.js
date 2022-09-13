const Express = require("express")
const UserController = require("./user.controller")
const jwt = require("jsonwebtoken")

const router = Express.Router()

router.post("/register", UserController.sandesh )
router.post("/login", UserController.login )
router.put("/updateprofile",function(req,res,next){
    var token = req.get("Authorization")
    console.log("token" , token)
    try{
        var payload = jwt.verify(token,"mysecretkey")
    }
    catch {
        console.log("token is not valid")
        res.status(401).send()
    }
    if(payload){
        req.body.email = payload.email
        next()
    }
    console.log("token verification result" , payload)
},UserController.updateProfile)
router.get("/search",UserController.search)
router.post("/uploadprofileimage",UserController.uploadProfileImage)
router.delete("/deleteaccount", function(req,res,next){
    var token = req.get("Authorization")
    console.log("token" , token)
    try{
        var payload = jwt.verify(token,"mysecretkey")
    }
    catch {
        console.log("token is not valid")
        res.status(401).send()
    }
    if(payload){
        req.body.email = payload.email
        next()
    }
    console.log("token verification result" , payload)
} ,UserController.deleteAccount)
router.post("/recoverpassword",UserController.recoverPassword)

module.exports = router 