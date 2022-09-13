const EventEmitter = require("events")
const UserModel = require("./user.model")

exports.createUser = function(data){
console.log("here in service for creating user", data)
    return new Promise(function(resolve,reject){
        data.email = data.email.toLowerCase()
        var userdata =   UserModel(data)
        userdata.save().then(function(result){
            console.log("result of mongodb operation", result)
            resolve(result)
        }, function(error){
            console.log("Error in saving user to database" , error)
            if(error.code==11000){
                reject(error)
            }
            else{
                reject()

            }
        })
    })

}

exports.findUser = function(data){

    return new Promise(function(resolve,reject){
        var queryObj = {
            email:data.email.toLowerCase(),
            password:data.password
        }
        UserModel.findOne(queryObj,{email:1,premiumuser:1,profilecompleted:1,phone:1}).then(function(result){
            console.log("FInding user from db" , result)
            if(result){
                resolve(result)
            }
            else{
                reject("Invalid Credentials")
            }
        }).catch(function(error){
            reject()
            console.log("error in finding user from db")
        })
    }) 
}


exports.recoverPassword = (data)=>{
    let emitter = new EventEmitter()
    console.log("Here we are finding password of user")
    var queryObj = {email:data.email}
    UserModel.findOne(queryObj).then((result)=>{
        console.log("result of db operation", result)
        if(result){
            return emitter.emit("FOUND" , result)
        }
        else{
            return emitter.emit("NOT_FOUND")
        }
    }).catch((error)=>{
        return emitter.emit("ERROR")
    })

    return emitter
}

exports.findUsers = (data)=>{
    return new Promise((resolve,reject)=>{
        console.log("Here we will find users from database")
        var query = { "email": { "$regex": data.q, "$options": "i" } }
        UserModel.find(query).then((result)=>{
            console.log("Users in db are " , result)
            resolve(result)
        }).catch((error)=>{
            reject()
            console.log("...... error in finding users from database", error)
        })
    })  
}


exports.updateProfile = (data, cb)=>{
    var queryObj = {
        email:data.email
    }
    var updateObject = {
        "$set" :{
            image:data.image,
            name:data.name,
            profilecompleted:true
        }
      
    }
    UserModel.findOneAndUpdate(queryObj,updateObject).then((result)=>{
        console.log("Result of update user from db", result)
        cb(null,result)
    }).catch((error)=>{
        console.log("error of update user from db is" , error)
        cb(error,null)

    })
}


