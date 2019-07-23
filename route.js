const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const errorHandler = require("errorhandler");
const passport = require("passport");
const md5 = require("md5");
const auth = require("./config/auth");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const router = express.Router();
// "mongodb://yassinereptor:85001997yw@ds251507.mlab.com:51507/muse_db"
mongoose.connect("mongodb://127.0.0.1:27017/etil", { useNewUrlParser: true });
mongoose.set("debug", true);

require("./models/users");
require("./models/place");
require("./models/article");
require("./config/passport");

const Users = mongoose.model("Users");
const Place = mongoose.model("Place");
const Article = mongoose.model("Article");
let now = new Date();
router.post("/add-article", auth.optional, (req, res, next) => {
  // convert photo from base64 and save it
  const base64Image = req.body.image.split(";base64,").pop();
  // Create images folder if not exist
  const filename = "/images/" + Date.now() + "-" + "test" + ".jpg";
  const filename2 = "admin/public/images/" + Date.now() + "-" + "test" + ".jpg";
  fs.writeFile(filename2, base64Image, { encoding: "base64" }, err => {
    if (err) res.json({ msg: "Your photo is invalid" });
  });
  const article = new Article({
    name: req.body.name,
    place: req.body.place,
    serie: req.body.serie,
    author: req.body.author,
    audio: req.body.audio,
    image: filename,
    description: req.body.description,
    created_at: now.getDate()
  });
  article.save(function (err) {
    if (err) return handleError(err);
    return res.json({
      res: "saved"
    });
  });
});
router.post("/add-place", auth.optional, (req, res, next) => {
  // convert photo from base64 and save it
  const base64Image = req.body.image.split(";base64,").pop();
  // Create images folder if not exist
  const filename = "/images/" + Date.now() + "-" + "test" + ".jpg";
  var filename2 = "admin/public/images/" + Date.now() + "-" + "test" + ".jpg";
  fs.writeFile(filename2, base64Image, { encoding: "base64" }, err => {
    if (err) res.json({ msg: "Your photo is invalid" });
  });
  var i = 0;
  var filename360 = [];
  var filename2,filename2360;
  var base64Image360;   
  while (req.body.image360[i])
  {
  base64Image360 = req.body.image360[i].split(";base64,").pop();
  // Create images folder if not exist
  filename2 = "/images/" + Date.now() + i + "360" + ".jpg";
  filename360.push(filename2);
  filename2360 = "admin/public/images/" + Date.now() + "-" + "360" + ".jpg";
  fs.writeFile(filename2360, base64Image360, { encoding: "base64" }, err => {
    if (err) res.json({ msg: "Your photo is invalid" });
  });
  i++;
  }
  const place = new Place({
    name: req.body.name,
    address: req.body.address,
    serie: req.body.serie,
    author: req.body.author,
    city: req.body.city,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    image: filename,
    image360: JSON.stringify(filename360),
    description: req.body.description,
    created_at: now.getDate()
  });

 
  place.save(function (err) {
    if (err) return handleError(err);
    return res.json({
      res: "saved"
    });
  });
});
router.get("/places", auth.optional, (req, res, next) => {
  Place.find({}, function (err, places) {
    res.send(places);
  });
});
router.get("/place/:serieID", auth.optional, (req, res, next) => {
  const serie_id = req.params.serieID;
  Place.find({ serie: serie_id }, function (err, places) {
    res.send(places);
  });
});
router.get("/articles", auth.optional, (req, res, next) => {
  Article.find({}, function (err, places) {
    res.send(places);
  });
});
router.get("/article/:serieID", auth.optional, (req, res, next) => {
  const serie_id = req.params.serieID;
  Article.find({ serie: serie_id }, function (err, places) {
    res.send(places);
  });
});
router.post("/signup", auth.optional, (req, res, next) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    company_name: req.body.company_name,
    company_id: req.body.company_id,
    cin: req.body.cin,
    phone: req.body.phone,
    seller: req.body.seller,
    bayer: req.body.bayer,
    lat: req.body.lat,
    lng: req.body.lng,
    country: req.body.country,
    pos: req.body.pos
  };

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: "is required"
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  if (!user.name) {
    return res.status(422).json({
      errors: {
        name: "is required"
      }
    });
  }

  if (!user.cin) {
    return res.status(422).json({
      errors: {
        cin: "is required"
      }
    });
  }

  if (!user.phone) {
    return res.status(422).json({
      errors: {
        phone: "is required"
      }
    });
  }

  if (!user.lat && !this.user.lng) {
    return res.status(422).json({
      errors: {
        latlng: "is required"
      }
    });
  }

  if (!user.country) {
    return res.status(422).json({
      errors: {
        country: "is required"
      }
    });
  }

  if (req.body.profile != "non") user.profile = "yes";
  else user.profile = "non";

  const finalUser = new Users(user);
  finalUser.setPassword(user.password);
  return finalUser.save().then(() => {
    if (req.body.profile != "non") {
      var folder = "storage/profiles";
      fs.writeFile(
        folder + "/" + finalUser.toAuthJSON()._id + ".png",
        req.body.profile,
        "base64",
        function (err) {
          console.log(err);
        }
      );
    }
    return res.json({
      user: finalUser.toAuthJSON()
    });
  });
});

router.post("/login", auth.optional, (req, res, next) => {
  const userObj = {
    email: req.body.email,
    password: req.body.password
  };

  console.log(userObj);

  if (!userObj.email) {
    return res.status(422).json({
      errors: {
        email: "is required"
      }
    });
  }

  if (!userObj.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  return passport.authenticate(
    "local",
    {
      session: false
    },
    (err, passportUser, info) => {
      if (err) {
        return res.status(400).json(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();

        return res.json({
          user: user.toAuthJSON()
        });
      }

      return res.status(422).json({
        errors: {
          info: "invalide"
        }
      });
    }
  )(req, res, next);
});

router.get("/current", auth.required, (req, res, next) => {
  const id = req.query.id;

  return Users.findById(id).then(user => {
    if (!user) {
      return res.sendStatus(400);
    }
    console.log(user);
    return res.json({
      user: user
    });
  });
});

router.post("/info", auth.optional, (req, res, next) => {
  const id = req.body.id;

  return Users.findById(id).then(user => {
    if (!user) {
      return res.sendStatus(400);
    }
    console.log(user);
    return res.json({
      user: user
    });
  });
});

module.exports = router;
