const Mongoose=require("mongoose")
const StorySchema = new Mongoose.Schema({
    name:{type:String,required:true},
    title:{type:String,unique:true,required:true},
    description:{type:String},
    imageUrl:{type:String},
    publisheddate:{type:Date},
    languages:{type:[String]},
    storyid:{type:Number,unique:true,required:true},
    rating:{type:Number,default:9},
    creationdate:{type:Date,default:new Date()},
    verified:{type:Boolean,default:false},
})
const StoryModel=Mongoose.model("stories",StorySchema)
module.exports=StoryModel