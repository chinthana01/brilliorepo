const StoryServices = require("./story.services");
exports.uploadStory= function (req, res) {
  StoryServices.createStory(req.body).then(
    function (result) {
      res.send({
        message: "Story uploaded",
      });
      console.log(result.name);
    },
    function (error) {
      if (error) {
        res.status(409).send({
          message: "Story Already exist",
        });
      } else {
        res.status(500).send();
      }
      console.log("It reached in rejection of controller");
    }
  );
};
exports.getStories=(req,res)=>{
    StoryServices.getData().then(
      function (result) {
        res.send({
          message: "Stories retrieved",
        });
        console.log(result.name);
      },
      function (error) {
          res.status(500).send();
        console.log("No stories in db");
      }
    );
  }