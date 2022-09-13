const UserService = require("./user.services");
const jwt = require("jsonwebtoken");
const mail = require("../common.service");
const multer = require('multer');
const UserModel = require("./user.model");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload= multer({ storage: storage }).single('file')


exports.register = function (req, res) {
  UserService.createUser(req.body).then(
    function (result) {
      res.send({
        message: "User Created",
      });
      console.log(result.email);
      // mail.mailer(result.email)
    },
    function (error) {
      if (error) {
        res.status(409).send({
          message: "User Already exist",
        });
      } else {
        res.status(500).send();
      }
      console.log("It reached in rejection of controller");
    }
  );
};
exports.login = function (req, res) {
  UserService.findUser(req.body).then(
    function () {
      //creating a jwt
      var payload = {
        email: req.body.email.toLowerCase(),
      };
      var token = jwt.sign(payload, "mysecretkey");
      res.setHeader("Authorization", token);
      res.send({
        message: "Login Success",
      });
    },
    function (error) {
      if (error) {
        res.status(500).send({
          message: "Invalid Credentials",
        });
      } else {
        res.status(500).send();
      }
    }
  );
};
exports.deleteAccount = function (req, res) {};
exports.editAccount = function (req, res) {};
exports.forgotPassword = (req, res) => {
  UserService.recoverPassword(req.body)
    .once("NOT_FOUND", () => {
      res.status(500).send({
        message: "No Such Email Exists",
      });
    })
    .once("MIl_GAYA", (result) => {
      console.log("Anusha");
      mail
        .responseMail(req.body.email, result.password)
        .then(() => {
          res.send({
            message: "Password Sent to your Email",
          });
        })
        .catch(() => {
          res.status(500).send();
        });
    })
    .once("ERROR", () => {
      res.status(500).send();
    });
};
exports.search = (req, res) => {
  console.log("query is ", req.query);
  UserService.findUsers(req.query)
    .then((result) => {
      console.log(result);
      res.send({
        result,
      });
    })
    .catch(function () {
      res.status(500);
    });
}
exports.uploadImage = (req, res) => {
    upload(req, res, (err) => {
      if (err) {
          console.log("error is",err)
        res.sendStatus(500);
      }
      res.send(req.file);
    });
  }
  exports.updateProfile = (req, res) => {

    UserService.updateProfile(req.body, (error, data) => {

      if (error) {

        res.status(500).send({

          message: "Could not update Profile"

        })

      } else {

        res.status(204).send({

          user: data

        })

      }

    })

 

 

 

  }
  exports.isLogin=(req,res)=>{
    
  }