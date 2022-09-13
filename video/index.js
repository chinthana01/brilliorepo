const Express = require("express")
const VideoController = require("./video.controller")

const router = Express.Router()

router.post("/addvideo",VideoController.addVideo)
router.get("/listall",VideoController.getAllVideos)
router.get("/getdetails/:videoid",VideoController.getVideodetails)

module.exports =router