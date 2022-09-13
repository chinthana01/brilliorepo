const StoryModel=require('./story.model')
const EventEmitter=require('events')
exports.createStory=function(data){
    return new Promise(function(resolve,reject){
        data.storyid = Math.floor(100000000 + Math.random() * 900000000)+Date.now()
        var storydata=StoryModel(data)
        storydata.save().then(function(result){
            console.log("Result of mongodb operation",result)
            resolve(result);
        },function(error){
            if(error.code=11000){
                console.log("Error in saving story to database",error)
                reject(error);
            }else{
                reject();
            }
        })
    })
}
exports.getData=function(){
    return new Promise(function(resolve,reject){
        StoryModel.find({}).then(function(result){
            console.log("stories in db are", result)
            resolve(result)
    }).catch((error)=>{
        reject()
        console.log("...... error in finding users from db",error)
        })
    })
 }