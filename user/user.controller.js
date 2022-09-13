const UserService = require("./user.services")
const CommonService =  require("../common.service")
const jwt = require("jsonwebtoken")
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')


exports.sandesh = function(req,res){
    UserService.createUser(req.body).then(function(result){
        CommonService.sendMail(req.body.email).then((result)=>{
            console.log("resulkt of email sending" , result)
            res.send({
                message:"User Created"
            })
        }).catch((error)=>{
            res.status(500).send()
            console.log("Error in sending " , error)
        })
    },function(error){
        if(error){
            res.status(409).send({
                message:"User already exists"
            })
        }
        else{
            res.status(500).send()

        }
        console.log("it reached in rejection of controller")
    })
}

exports.login = function(req,res){
    UserService.findUser(req.body).then(function(result){
        // creating a jwt 
        var payload = {
            email:req.body.email.toLowerCase()
        }
        var token = jwt.sign(payload,"mysecretkey")
        res.setHeader("Authorization", token)
        res.send({
            user:result,
            message:"login success"
        })
    }, function(error){
        if(error){
            res.status(500).send({
                message:"Invalid credentials"
            })
        }
        else{
            res.status(500).send()
        }
    })
}


exports.deleteAccount = function(req,res){
    
}

exports.recoverPassword = (req,res)=>{
    UserService.recoverPassword(req.body)
    .once("NOT_FOUND", function(){
        res.status(500).send({
            message:"No Such Email Exists"
        })
    })
    .once("FOUND", function(result){
        CommonService.sendPassword(req.body.email,result.password).then(()=>{
            res.send({
                message:"Password Sent to your Email"
            })
        }).catch((error)=>{
            console.log("Error is" , error)
            res.status(500).send()
        })
    })
    .once("ERROR", ()=>{
        res.status(500).send()
    })
}

exports.search = (req,res)=>{
    console.log("Query is" , req.query)
    UserService.findUsers(req.query).then((result)=>{
        res.send({
            users:result
        })
    }).catch(function(){
        res.status(500)
    })
}

exports.uploadProfileImage = (req,res)=>{
    upload(req, res, (err) => {
        if (err) {
          res.sendStatus(500);
        }
        res.send(req.file);
      });
}

exports.updateProfile = (req,res)=>{
    UserService.updateProfile(req.body,function(error,result){
        if(error){
            res.status(500).send()
        }
        else{
            res.status(204).send()
        }

    })
}