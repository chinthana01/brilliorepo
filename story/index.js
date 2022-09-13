const Express=require('express')

const storyController=require('./story.controller')

const router= Express.Router()



router.post('/upload',storyController.uploadStory)



router.get('/getallstories',storyController.getStories)



module.exports=router